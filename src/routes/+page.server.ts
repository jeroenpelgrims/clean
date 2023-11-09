import type { IntervalUnit, Task } from '$lib/models/task';
import '$lib/mongo';
import { connect, serializeId } from '$lib/mongo';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	const { tasks } = await connect();
	const allTasks = await tasks.find().toArray();
	const serialized = allTasks.map(serializeId);

	return {
		tasks: serialized,
	};
};

function formDataToTask(data: FormData) {
	const name = data.get('name')!.toString();
	const intervalValue = Number.parseInt(data.get('intervalValue')!.toString());
	const intervalUnit = data.get('intervalUnit') as IntervalUnit;
	const task: Task = { name, intervalValue, intervalUnit };
	return task;
}

export const actions = {
	createTask: async ({ request }) => {
		const data = await request.formData();
		const task = formDataToTask(data);
		const { tasks, close } = await connect();
		await tasks.insertOne(task);
		await close();
	},
	updateTask: async ({ request }) => {
		const data = await request.formData();
		const task = formDataToTask(data);
		console.log('UPDATE', task);
		const id = data.get('id')?.toString()!;
		const { tasks, close } = await connect();
		await tasks.updateOne({ _id: new ObjectId(id) }, { $set: task });
		await close();
	},
	deleteTask: async ({ request }) => {
		console.log('DELETE', request);
		const data = await request.formData();
		const id = data.get('id')?.toString()!;
		const { tasks, close } = await connect();
		await tasks.deleteOne({
			_id: new ObjectId(id),
		});
		await close();
	},
};
