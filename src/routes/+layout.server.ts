import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({}) => {
	// const { close, teams } = await connect();
	// const userTeams = await teams
	// 	.find({}, { projection: { _id: 1, name: 1 } })
	// 	.toArray();
	// const selectedTeamId = userTeams[0]._id;
	// await close();

	return {
		// userTeams: userTeams.map(serializeId),
		// selectedTeamId: selectedTeamId.toString(),
	};
};
