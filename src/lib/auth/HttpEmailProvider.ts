import { env } from '$env/dynamic/private';
import type { EmailConfig, EmailUserConfig } from '@auth/core/providers';

export function HttpEmailProvider(options: EmailUserConfig): EmailConfig {
	return {
		id: 'email',
		type: 'email',
		name: 'Email',
		from: 'clean@jeroenpelgrims.com',
		maxAge: 24 * 60 * 60,
		sendVerificationRequest,
		options,
	};
}

export async function sendVerificationRequest({
	url,
	identifier,
	provider,
}: Parameters<EmailConfig['sendVerificationRequest']>[0]) {
	const baseUrl = 'https://api.smtp2go.com/v3';
	const mailApiUrl = `${baseUrl}/email/send`;
	const data = {
		api_key: env.SMTP2GO_API_KEY,
		to: [identifier],
		sender: provider.from,
		subject: 'Sign in to "clean"',
		text_body: textMailTemplate(url),
		html_body: htmlMailTemplate(url),
	};
	await fetch(mailApiUrl, {
		method: 'POST',
		body: JSON.stringify(data),
	});
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
