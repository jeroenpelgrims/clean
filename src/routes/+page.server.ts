import '$lib/db';
import { db } from '$lib/db';
import { task, taskGroup, taskLog, team } from '$lib/db/schema';
import { eq, max } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { selectedTeam } = await parent();
	const taskGroups = await getTaskGroups(selectedTeam?.id);

	const lastCompleted = await db
		.select({
			taskId: task.id,
			lastCompleted: max(taskLog.timestamp),
		})
		.from(taskLog)
		.innerJoin(task, eq(taskLog.taskId, task.id))
		.innerJoin(taskGroup, eq(taskGroup.id, task.taskGroupId))
		.innerJoin(team, eq(team.id, taskGroup.teamId))
		.where(eq(team.id, selectedTeam?.id ?? ''))
		.groupBy(task.id);

	return {
		taskGroups,
		lastCompleted: new Map(
			lastCompleted.map((result) => [result.taskId, result.lastCompleted]),
		),
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
