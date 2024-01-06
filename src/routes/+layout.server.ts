import { db } from '$lib/db';
import { team } from '$lib/db/schema';
import { getSelectedTeamId } from '$lib/db/userTeam';
import { getSession } from '@auth/sveltekit';
import { eq } from 'drizzle-orm';
import { authConfig } from '../auth/config';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, cookies }) => {
	const session = await getSession(request, authConfig);

	if (!session?.user?.id) {
		return {
			user: undefined,
			userTeams: [],
			selectedTeamId: undefined,
		};
	}

	const selectedTeamId = await getSelectedTeamId(session, cookies);
	const selectedTeam = await getTeamById(selectedTeamId!);

	return {
		user: session?.user,
		selectedTeam,
	};
};

function getTeamById(teamId: string) {
	return db.query.team.findFirst({
		where: eq(team.id, teamId),
	});
}
