import '$lib/db';
import { client, db } from '$lib/db';
import { user } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';

const selectedTeamId = ObjectId.createFromHexString('654fed087cd3fce0efca2ad3');

export const load: PageServerLoad = async ({ parent }) => {
	const foo = await db.query.user.findFirst({ where: and(eq(user.id, '')) });
	client.close();
	// const { selectedTeamId } = await parent();
	// const { close, teams } = await connect();
	// const selectedTeam = (await teams.findOne({
	// 	_id: new ObjectId(selectedTeamId),
	// }))!;
	// await close();

	return {
		// selectedTeam: serializeId(selectedTeam),
	};
};
