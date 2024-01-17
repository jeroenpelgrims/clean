import '$lib/db';
import { db } from '$lib/db';
import { taskGroup } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { selectedTeam } = await parent();
	const selectedTeamId = selectedTeam?.id ?? '';
	const taskGroups = await db.query.taskGroup.findMany({
		where: eq(taskGroup.teamId, selectedTeamId),
	});

	return { taskGroups };
};
