import { env } from '$env/dynamic/private';
import { connect } from '$lib/db';
import { initializeNewUser } from '$lib/db/users';
import type { User } from '@auth/core';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { SvelteKitAuthConfig } from '@auth/sveltekit';
import { HttpEmailProvider } from './HttpEmailProvider';

declare module '@auth/core' {
	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 */
	interface User {
		id: string;
		username: string;
	}
	/**
	 * The shape of the account object returned in the OAuth providers' `account` callback,
	 * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
	 */
	interface Account {}

	/**
	 * Returned by `useSession`, `auth`, contains information about the active session.
	 */
	interface Session {
		user: User;
	}
}

export const authConfig: SvelteKitAuthConfig = {
	secret: env.AUTH_SECRET,
	adapter: DrizzleAdapter(connect()),
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},

	providers: [HttpEmailProvider({})],
	callbacks: {
		async signIn({}) {
			return true;
		},
		async jwt({ token, user, account, profile, trigger }) {
			if (trigger === 'signUp' && user?.id) {
				await initializeNewUser(user.id);
			}

			return { ...token, user: token.user ?? user };
		},
		async session({ session, newSession, token }) {
			return { ...session, user: token.user as User };
		},
	},
};
