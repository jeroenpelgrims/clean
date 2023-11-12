import { connect } from '$lib/db/index.js';
import type { IntervalUnit, Task } from '$lib/db/models.js';
import { ObjectId } from 'mongodb';

const selectedTeamId = ObjectId.createFromHexString('654fed087cd3fce0efca2ad3');

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
		const groupId = data.get('groupId')!.toString();
		const task = formDataToTask(data);
		const { teams, close } = await connect();
		await teams.updateOne(
			{
				_id: selectedTeamId,
				'taskGroups._id': ObjectId.createFromHexString(groupId),
			},
			{ $push: { 'taskGroups.$.tasks': { _id: new ObjectId(), ...task } } },
		);
		await close();
	},
	updateTask: async ({ request }) => {
		// const data = await request.formData();
		// const task = formDataToTask(data);
		// const id = data.get('id')?.toString()!;
		// const { teams, close } = await connect();
		// await tasks.updateOne({ _id: new ObjectId(id) }, { $set: task });
		// await close();
	},
	deleteTask: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString()!;
		const groupId = data.get('groupId')?.toString()!;
		const { teams, close } = await connect();
		await teams.updateOne(
			{
				_id: selectedTeamId,
				'taskGroups._id': ObjectId.createFromHexString(groupId),
			},
			{
				$pull: {
					'taskGroups.$.tasks': { _id: ObjectId.createFromHexString(id) },
				},
			},
		);
		await close();
	},
};
