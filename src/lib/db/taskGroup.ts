import { and, eq } from 'drizzle-orm';
import { db } from '.';
import { taskGroup, team, teamUser } from './schema';

export async function canUserManageGroup(
	userId: string | undefined,
	taskGroupId: string,
) {
	if (!userId) {
		return false;
	}

	const group = await db
		.select()
		.from(team)
		.innerJoin(
			teamUser,
			and(eq(teamUser.teamId, team.id), eq(teamUser.userId, userId)),
		)
		.innerJoin(
			taskGroup,
			and(eq(taskGroup.id, taskGroupId), eq(taskGroup.teamId, team.id)),
		);

	return !!group;
}
