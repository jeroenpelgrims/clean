import '$lib/db';
import { connect } from '$lib/db';
import { team, teamUser, user } from '$lib/db/schema';
import { isUserInTeam, setSelectedTeamId } from '$lib/db/userTeam';
import { error } from '@sveltejs/kit';
import { and, count, eq, getTableColumns, inArray, not } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user: activeUser } = await parent();
	const db = connect();
	const userTeams = await db
		.select({ ...getTableColumns(team), username: teamUser.username })
		.from(team)
		.innerJoin(
			teamUser,
			and(
				eq(teamUser.teamId, team.id),
				eq(teamUser.userId, activeUser?.id ?? ''),
			),
		);
	const otherMembers = await db
		.select({ ...getTableColumns(teamUser), email: user.email })
		.from(teamUser)
		.innerJoin(user, eq(teamUser.userId, user.id))
		.where(
			and(
				inArray(
					teamUser.teamId,
					userTeams.map((t) => t.id),
				),
				not(eq(teamUser.userId, activeUser?.id ?? '')),
			),
		);

	return { userTeams, otherMembers };
};

export const actions = {
	create: async ({ request, locals }) => {
		const session = await locals.auth();
		const data = await request.formData();
		const name = data.get('teamName')?.toString() ?? '';
		const username = data.get('username')?.toString();
		const db = connect();
		await db.transaction(async (tx) => {
			const teamResults = await tx
				.insert(team)
				.values({
					id: uuid(),
					name,
				})
				.returning();
			const newTeam = teamResults[0];
			const userId = session?.user?.id!;
			await tx.insert(teamUser).values({
				teamId: newTeam.id,
				userId,
				username,
			});
		});
	},
	leave: async ({ request, locals }) => {
		const data = await request.formData();
		const session = await locals.auth();
		const teamId = data.get('id')!.toString();
		const userId = session?.user?.id!;

		const userInTeam = await isUserInTeam(userId, teamId);
		if (!userInTeam) {
			return error(403);
		}

		const db = connect();
		const teamUserCount = await db
			.select({ count: count(teamUser.userId) })
			.from(teamUser)
			.where(eq(teamUser.teamId, teamId))
			.get();

		// If there's only 1 user in the team, we'll delete the team
		// Otherwise we just remove the user from the team
		const isDelete = (teamUserCount?.count ?? 0) <= 1;
		if (isDelete) {
			await db.delete(team).where(eq(team.id, teamId));
		} else {
			await db
				.delete(teamUser)
				.where(and(eq(teamUser.teamId, teamId), eq(teamUser.userId, userId)));
		}
	},
	select: async ({ request, locals, cookies }) => {
		const data = await request.formData();
		const teamId = data.get('id')!.toString();
		const session = await locals.auth();
		if (session) {
			await setSelectedTeamId(session, cookies, teamId);
		}
	},
	edit: async ({ request }) => {
		const data = await request.formData();
		const teamId = data.get('teamId')!.toString();
		const teamUserId = data.get('teamUserId')?.toString();
		const teamName = data.get('teamName')?.toString();
		const username = data.get('username')?.toString();

		const userInTeam = await isUserInTeam(teamUserId, teamId);
		if (!userInTeam) {
			return error(403);
		}

		const db = connect();
		await db.transaction(async (tx) => {
			const updateTeamName = tx
				.update(team)
				.set({ name: teamName })
				.where(eq(team.id, teamId));
			const updateMemberName = tx
				.update(teamUser)
				.set({ username })
				.where(
					and(
						eq(teamUser.teamId, teamId),
						eq(teamUser.userId, teamUserId ?? ''),
					),
				);
			await Promise.all([updateTeamName, updateMemberName]);
		});
	},
};
