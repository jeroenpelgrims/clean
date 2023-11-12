import '$lib/db';
import { connect, serializeId } from '$lib/db';
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
