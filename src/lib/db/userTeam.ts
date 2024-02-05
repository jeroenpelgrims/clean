import type { Session } from '@auth/core/types';
import type { Cookies } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { connect } from '.';
import { team, teamUser } from './schema';

const SELECTED_TEAM_ID_COOKIE = 'selectedTeamId';

export async function getSelectedTeamId(
	session: Session | null,
	cookies: Cookies,
) {
	const userId = session?.user?.id;

	if (!userId) {
		return undefined;
	}

	const selectedTeamId = cookies.get(SELECTED_TEAM_ID_COOKIE);
	if (selectedTeamId) {
		return selectedTeamId;
	}

	const firstTeam = await getFirstTeamForUser(userId);
	const firstTeamId = firstTeam!.id;

	cookies.set(SELECTED_TEAM_ID_COOKIE, firstTeamId, { path: '/' });

	return firstTeamId;
}

export async function setSelectedTeamId(
	session: Session,
	cookies: Cookies,
	teamId: string,
) {
	const userId = session?.user?.id;
	const isUserTeam = await isUserInTeam(userId, teamId);

	if (isUserTeam) {
		cookies.set(SELECTED_TEAM_ID_COOKIE, teamId, { path: '/' });
	}
}

export async function isUserInTeam(
	userId: string | undefined,
	teamId: string | undefined,
) {
	if (userId === undefined || teamId === undefined) {
		return false;
	}

	const db = connect();
	const result = db
		.select()
		.from(team)
		.innerJoin(teamUser, and(eq(team.id, teamId), eq(teamUser.userId, userId)))
		.limit(1)
		.get();
	return result !== undefined;
}

async function getFirstTeamForUser(userId: string) {
	const db = connect();
	const firstTeam = await db
		.select({ id: team.id })
		.from(team)
		.innerJoin(
			teamUser,
			and(eq(team.id, teamUser.teamId), eq(teamUser.userId, userId)),
		)
		.limit(1)
		.get();
	return firstTeam;
}

export async function getUserTeams(userId: string | undefined) {
	if (!userId) {
		return [];
	}

	const db = connect();
	const userTeams = await db
		.select({ id: team.id, name: team.name })
		.from(team)
		.innerJoin(teamUser, eq(team.id, teamUser.teamId))
		.where(eq(teamUser.userId, userId!))
		.execute();

	return userTeams;
}
