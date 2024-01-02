import { SvelteKitAuth } from '@auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { authConfig } from './auth/config';

export const handle: Handle = SvelteKitAuth(authConfig);

// export const handle: Handle = async (input) => {
// 	const session = await input.event.locals.getSession();
// 	const userId = session?.user?.id;
// 	const selectedTeamId = await getSelectedTeamId(userId, input.event.cookies);
// 	return SvelteKitAuth(authConfig)(input);
// };
