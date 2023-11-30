import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';

export const handle = SvelteKitAuth({
	providers: [
		Credentials({
			credentials: {
				username: { label: 'Username' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize({}, request) {
				const response = await fetch(request);
				if (!response.ok) return null;
				return (await response.json()) ?? null;
			},
		}),
	],
});
