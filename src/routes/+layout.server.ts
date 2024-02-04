import { db } from '$lib/db';
import { team } from '$lib/db/schema';
import { getSelectedTeamId } from '$lib/db/userTeam';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, cookies, locals }) => {
	const session = await locals.auth();

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
