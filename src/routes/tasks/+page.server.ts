import { db } from '$lib/db/index.js';
import type { IntervalUnit, Task } from '$lib/db/models.js';
import { task } from '$lib/db/schema.js';
import { canUserManageTask } from '$lib/db/task.js';
import { canUserManageGroup } from '$lib/db/taskGroup.js';
import { getUserIdFromLocals } from '$lib/sessionHelpers.js';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

function formDataToTask(data: FormData): Task {
	const id = data.get('id')?.toString() ?? uuid();
	const name = data.get('name')!.toString();
	const intervalValue = Number.parseInt(data.get('intervalValue')!.toString());
	const intervalUnit = data.get('intervalUnit') as IntervalUnit;
	const taskGroupId = data.get('groupId')!.toString();
	return { id, name, intervalValue, intervalUnit, taskGroupId };
}

export const actions = {
	createTask: async ({ request, locals }) => {
		const data = await request.formData();
		const newTask = formDataToTask(data);
		const userId = await getUserIdFromLocals(locals);

		const userCanManageGroup = await canUserManageGroup(
			userId,
			newTask.taskGroupId,
		);
		if (!userCanManageGroup) {
			return fail(403);
		}

		await db.insert(task).values(newTask).execute();
	},
	updateTask: async ({ request, locals }) => {
		const data = await request.formData();
		const updatedTask = formDataToTask(data);
		const userId = await getUserIdFromLocals(locals);

		const userCanManageTask = await canUserManageTask(userId, updatedTask.id);
		if (!userCanManageTask) {
			return fail(403);
		}

		await db
			.update(task)
			.set(updatedTask)
			.where(eq(task.id, updatedTask.id))
			.execute();
	},
	deleteTask: async ({ request, locals }) => {
		const data = await request.formData();
		const taskId = data.get('id')?.toString()!;
		const userId = await getUserIdFromLocals(locals);

		const userCanManageTask = await canUserManageTask(userId, taskId);
		if (!userCanManageTask) {
			return fail(403);
		}

		await db.delete(task).where(eq(task.id, taskId)).execute();
	},
};
