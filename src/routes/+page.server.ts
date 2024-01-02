import '$lib/db';
import { db } from '$lib/db';
import { taskGroup } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user, selectedTeamId } = await parent();
	const taskGroups = await getTaskGroups(selectedTeamId);

	return {
		taskGroups,
	};
};

async function getTaskGroups(teamId: string | undefined) {
	if (!teamId) {
		return [];
	}

	const taskGroups = await db.query.taskGroup.findMany({
		where: eq(taskGroup.teamId, teamId),
		with: {
			tasks: true,
		},
	});
	return taskGroups;
}
