import { and, eq } from 'drizzle-orm';
import { db } from '.';
import { task, taskGroup, team, teamUser } from './schema';

export async function canUserManageTask(
	userId: string | undefined,
	taskId: string,
) {
	if (!userId) {
		return false;
	}

	const foundTask = await db
		.select()
		.from(team)
		.innerJoin(
			teamUser,
			and(eq(teamUser.teamId, team.id), eq(teamUser.userId, userId)),
		)
		.innerJoin(taskGroup, and(eq(taskGroup.teamId, team.id)))
		.innerJoin(
			task,
			and(eq(task.id, taskId), eq(task.taskGroupId, taskGroup.id)),
		)
		.limit(1)
		.get();

	return foundTask !== undefined;
}
