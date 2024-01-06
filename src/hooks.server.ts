import { SvelteKitAuth } from '@auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { authConfig } from './lib/auth/config';

export const handle: Handle = SvelteKitAuth(authConfig);
