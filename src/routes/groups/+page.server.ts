import { connect } from '$lib/db/index.js';
import { ObjectId } from 'mongodb';

const selectedTeamId = ObjectId.createFromHexString('654fed087cd3fce0efca2ad3');

export const actions = {
	createGroup: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')!.toString();
		const { teams, close } = await connect();
		await teams.updateOne(
			{ _id: selectedTeamId },
			{ $push: { taskGroups: { _id: new ObjectId(), name, tasks: [] } } },
		);
		await close();
	},
	updateGroup: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')!.toString();
		const id = data.get('id')!.toString();
		const _id = ObjectId.createFromHexString(id);

		const { teams, close } = await connect();
		await teams.updateOne(
			{ _id: selectedTeamId, 'taskGroups._id': _id },
			{ $set: { 'taskGroups.$.name': name } },
		);
		await close();
	},
	deleteGroup: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')!.toString();
		const _id = ObjectId.createFromHexString(id);
		const { teams, close } = await connect();
		await teams.updateOne(
			{ _id: selectedTeamId },
			{ $pull: { taskGroups: { _id } } },
		);
		await close();
	},
};
