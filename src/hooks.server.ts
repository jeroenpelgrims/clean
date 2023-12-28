import { SvelteKitAuth } from '@auth/sveltekit';
import { authConfig } from './auth/config';

export const handle = SvelteKitAuth(authConfig);
