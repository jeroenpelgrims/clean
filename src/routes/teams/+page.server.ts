import '$lib/db';
import { connect } from '$lib/db';
import { team, teamUser } from '$lib/db/schema';
import { and, count, eq, getTableColumns } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	const db = connect();
	const userTeams = await db
		.select({ ...getTableColumns(team) })
		.from(team)
		.innerJoin(
			teamUser,
			and(eq(teamUser.teamId, team.id), eq(teamUser.userId, user?.id ?? '')),
		)
		.execute();

	return { userTeams };
};

export const actions = {
	create: async ({ request, locals }) => {
		const session = await locals.auth();
		const data = await request.formData();
		const name = data.get('name')?.toString() ?? '';
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
			});
		});
	},
	leave: async ({ request, locals }) => {
		const data = await request.formData();
		const session = await locals.auth();
		const teamId = data.get('id')!.toString();
		const userId = session?.user?.id!;

		const db = connect();
		const teamUserCount = await db
			.select({ count: count(teamUser.userId) })
			.from(teamUser)
			.where(eq(teamUser.teamId, teamId))
			.get();
		// If there's only 1 user in the team, we'll delete the team
		// Otherwise we just remove the user from the team
		const isDelete = teamUserCount?.count === 1;

		await db.transaction(async (tx) => {
			if (isDelete) {
				console.log('deleting team');
				await tx.delete(teamUser).where(eq(teamUser.teamId, teamId));
				await tx.delete(team).where(eq(team.id, teamId));
			} else {
				console.log('leaving team');
				await tx
					.delete(teamUser)
					.where(and(eq(teamUser.teamId, teamId), eq(teamUser.userId, userId)));
			}
		});
	},
	select: async ({ request, locals }) => {},
};
