import { getUserIdFromLocals } from '$lib/auth/session';
import { db } from '$lib/db/index.js';
import { taskLog } from '$lib/db/schema.js';
import { canUserManageTask } from '$lib/db/task.js';
import { fail } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

export const actions = {
	logDone: async ({ request, locals }) => {
		const data = await request.formData();
		const taskId = data.get('id')?.toString()!;
		const rawTimestamp = data.get('timestamp')?.toString();
		const timestamp = dayjs(rawTimestamp);

		if (!taskId || !timestamp.isValid()) {
			return fail(400);
		}

		const userId = await getUserIdFromLocals(locals);
		const userCanManageTask = await canUserManageTask(userId, taskId);

		if (!userCanManageTask) {
			return fail(403);
		}

		await db
			.insert(taskLog)
			.values({ id: uuid(), taskId, timestamp: timestamp.toDate() })
			.execute();
	},
};
