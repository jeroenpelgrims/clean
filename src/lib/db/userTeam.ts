import type { Session } from '@auth/core/types';
import type { Cookies } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { db } from '.';
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

	cookies.set(SELECTED_TEAM_ID_COOKIE, firstTeamId);

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
		cookies.set(SELECTED_TEAM_ID_COOKIE, teamId);
	}
}

export async function isUserInTeam(
	userId: string | undefined,
	teamId: string | undefined,
) {
	if (userId === undefined || teamId === undefined) {
		return false;
	}

	const result = db
		.select()
		.from(team)
		.innerJoin(teamUser, and(eq(team.id, teamId), eq(teamUser.userId, userId)))
		.limit(1)
		.get();
	return result !== undefined;
}

async function getFirstTeamForUser(userId: string) {
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
