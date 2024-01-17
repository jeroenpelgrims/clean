import '$lib/db';
import { getTaskGroupsByTeamId } from '$lib/db/taskGroup';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { selectedTeam } = await parent();
	const taskGroups = await getTaskGroupsByTeamId(selectedTeam?.id);

	return { taskGroups };
};
