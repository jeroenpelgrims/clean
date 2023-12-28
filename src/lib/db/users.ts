import { v4 as uuid } from 'uuid';
import { db } from '.';
import { task, taskGroup, team, teamUser } from './schema';

export async function initializeNewUser(userId: string) {
	await db.transaction(async (tx) => {
		const teamId = uuid();
		await tx.insert(team).values({
			id: teamId,
			name: 'Default team',
		});

		await tx.insert(teamUser).values({
			teamId,
			userId,
		});

		const taskGroupId = uuid();
		await tx.insert(taskGroup).values({
			id: taskGroupId,
			name: 'Default task group',
			teamId: teamId,
		});

		const taskId = uuid();
		await tx.insert(task).values({
			id: taskId,
			name: 'This is an example task',
			intervalValue: 1,
			intervalUnit: 'week',
			taskGroupId: taskGroupId,
		});
	});
}
