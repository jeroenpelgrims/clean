import { db } from '$lib/db/index.js';
import { taskGroup } from '$lib/db/schema.js';
import { canUserManageGroup } from '$lib/db/taskGroup.js';
import { getSelectedTeamId, isUserInTeam } from '$lib/db/userTeam.js';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

export const actions = {
	createGroup: async ({ request, cookies, locals }) => {
		const session = await locals.getSession();
		const selectedTeamId = await getSelectedTeamId(session, cookies);
		const data = await request.formData();
		const name = data.get('name')!.toString();
		const isUserTeam = await isUserInTeam(session?.user?.id, selectedTeamId);

		if (!isUserTeam) {
			throw new Error('User is not in selected team');
		}

		await db
			.insert(taskGroup)
			.values({ id: uuid(), name, teamId: selectedTeamId })
			.execute();
	},
	updateGroup: async ({ request, locals }) => {
		const session = await locals.getSession();
		const userId = session?.user?.id;
		const data = await request.formData();
		const name = data.get('name')!.toString();
		const groupId = data.get('id')!.toString();

		const userCanManageGroup = await canUserManageGroup(userId, groupId);

		if (!userCanManageGroup) {
			throw new Error('User cannot manage group');
		}

		await db
			.update(taskGroup)
			.set({ name })
			.where(eq(taskGroup.id, groupId))
			.execute();
	},
	deleteGroup: async ({ request, locals }) => {
		const session = await locals.getSession();
		const userId = session?.user?.id;
		const data = await request.formData();
		const groupId = data.get('id')!.toString();

		const userCanManageGroup = await canUserManageGroup(userId, groupId);

		await db.delete(taskGroup).where(eq(taskGroup.id, groupId)).execute();
	},
};
