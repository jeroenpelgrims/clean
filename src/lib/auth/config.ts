import { env } from '$env/dynamic/private';
import { initializeNewUser } from '$lib/db/users';
import Email from '@auth/core/providers/email';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { SvelteKitAuthConfig } from '@auth/sveltekit';
import { db } from '../db';

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
	adapter: DrizzleAdapter(db),
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},

	providers: [
		// Credentials({
		// 	id: 'register',
		// 	credentials: {
		// 		username: { label: 'Username' },
		// 		password: { label: 'Password', type: 'password' },
		// 		passwordConfirm: { label: 'Confirm password', type: 'password' },
		// 	},
		// 	async authorize({ username, password, passwordConfirm }, request) {
		// 		console.log(username, password, passwordConfirm);
		// 		return null;
		// 	},
		// }),
		// Credentials({
		// 	id: 'login',
		// 	credentials: {
		// 		username: { label: 'Username' },
		// 		password: { label: 'Password', type: 'password' },
		// 	},
		// 	async authorize({}, request) {
		// 		console.log('request.body', request.body);
		// 		const user = { id: '1', username: 'test' };
		// 		return user;
		// 		const response = await fetch(request);
		// 		if (!response.ok) return null;
		// 		return (await response.json()) ?? null;
		// 	},
		// }),
		Email({
			id: 'email',
			from: env.SMTP_FROM,
			sendVerificationRequest({
				identifier: email,
				url,
				provider: { server, from },
				request,
			}) {
				sendMail(email, from, url, server);
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			// console.log({ user, account, profile, email, credentials });
			return true;
		},
		async jwt({ token, user, account, profile, trigger }) {
			// console.log('jwt token', token);
			// console.log('jwt user', user);
			// console.log('jwt account', account);
			// console.log('jwt profile', profile);
			// console.log('jwt trigger', trigger);

			if (trigger === 'signUp') {
				await initializeNewUser(user.id);
			}

			return { ...token, user: token.user ?? user };
		},
		async session({ session, token, user }) {
			// console.log('session session', session);
			// console.log('session token', token);
			// console.log('session user', user);
			return { ...session, user: token.user as any };
		},
	},
};

async function sendMail(
	to: string,
	from: string,
	signInUrl: string,
	apiKey: string,
) {
	const baseUrl = 'https://api.smtp2go.com/v3';
	const url = `${baseUrl}/email/send`;
	const data = {
		api_key: env.SMTP2GO_API_KEY,
		to: [to],
		sender: from,
		subject: 'Sign in to "clean"',
		text_body: textMailTemplate(signInUrl),
		html_body: htmlMailTemplate(signInUrl),
	};
	return fetch(url, { method: 'POST', body: JSON.stringify(data) });
}

function textMailTemplate(url: string) {
	return `
		Sign in to "clean".

		Follow the following link to sign in:
		${url}

		If you did not request this email you can safely ignore it.
	`;
}

function htmlMailTemplate(url: string) {
	return `
	<h1>Sign in to "clean"</h1>

	<a href="${url}" class="button">Sign in</a>

	<p>
	If you did not request this email you can safely ignore it. 
	</p>

	<style>
		html {
			font-family: sans-serif;
		}
		
		.button {
			background-color: #00c4a7;
			border-color: transparent;
			color: #fff;
			cursor: pointer;
			justify-content: center;
			padding-bottom: calc(.5em - 1px);
			padding-left: 1em;
			padding-right: 1em;
			padding-top: calc(.5em - 1px);
			text-align: center;
			white-space: nowrap;
			border-radius: .375em;
			text-decoration: none;
		}
	</style>
	`;
}
