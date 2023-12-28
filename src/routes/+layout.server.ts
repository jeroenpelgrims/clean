import { db } from '$lib/db';
import { team, teamUser } from '$lib/db/schema';
import { getSession } from '@auth/sveltekit';
import { eq } from 'drizzle-orm';
import { authConfig } from '../auth/config';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, cookies }) => {
	const session = await getSession(request, authConfig);
	const userId = session?.user?.id;

	const userTeams = await db
		.select({ id: team.id, name: team.name })
		.from(team)
		.innerJoin(teamUser, eq(team.id, teamUser.teamId))
		.where(eq(teamUser.userId, userId!))
		.execute();

	// TODO: get from settings
	const selectedTeamId = userTeams[0].id;

	return {
		user: session?.user,
		userTeams,
		selectedTeamId,
	};
};
