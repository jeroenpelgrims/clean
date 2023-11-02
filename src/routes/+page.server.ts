import type { IntervalUnit, Task } from '$lib/models/task';
import '$lib/mongo';
import { connect, serializeId } from '$lib/mongo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	const { tasks, close } = await connect();
	const allTasks = await tasks.find().toArray();
	const serialized = allTasks.map(serializeId);

	return {
		tasks: serialized,
	};
};

export const actions = {
	addTask: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')!.toString();
		const intervalValue = Number.parseInt(data.get('intervalValue')!.toString());
		const intervalUnit = data.get('intervalUnit') as IntervalUnit;
		const task: Task = { name, intervalValue, intervalUnit };

		const { tasks, close } = await connect();
		await tasks.insertOne(task);
		await close();
	},
};
