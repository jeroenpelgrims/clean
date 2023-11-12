import '$lib/db';
import { connect, serializeId } from '$lib/db';
import type { IntervalUnit, Task } from '$lib/db/models';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';

const selectedTeamId = ObjectId.createFromHexString('654fed087cd3fce0efca2ad3');

export const load: PageServerLoad = async ({ parent }) => {
	const { selectedTeamId } = await parent();
	const { close, teams } = await connect();
	const selectedTeam = (await teams.findOne({
		_id: new ObjectId(selectedTeamId),
	}))!;
	await close();

	return {
		selectedTeam: serializeId(selectedTeam),
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
	createGroup: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')!.toString();
		const { teams, close } = await connect();
		// const selectedTeamId = new ObjectId('');

		await teams.updateOne(
			{ _id: selectedTeamId },
			{ $push: { taskGroups: { _id: new ObjectId(), name, tasks: [] } } },
		);
		await close();
	},
	// createTask: async ({ request }) => {
	// 	const data = await request.formData();
	// 	const task = formDataToTask(data);
	// 	const { tasks, close } = await connect();
	// 	await tasks.insertOne(task);
	// 	await close();
	// },
	// updateTask: async ({ request }) => {
	// 	const data = await request.formData();
	// 	const task = formDataToTask(data);
	// 	const id = data.get('id')?.toString()!;
	// 	const { tasks, close } = await connect();
	// 	await tasks.updateOne({ _id: new ObjectId(id) }, { $set: task });
	// 	await close();
	// },
	// deleteTask: async ({ request }) => {
	// 	console.log('DELETE', request);
	// 	const data = await request.formData();
	// 	const id = data.get('id')?.toString()!;
	// 	const { tasks, close } = await connect();
	// 	await tasks.deleteOne({
	// 		_id: new ObjectId(id),
	// 	});
	// 	await close();
	// },
};
