import { env } from '$env/dynamic/private';
import type { EmailConfig, EmailUserConfig } from '@auth/core/providers';
import LoginMail from '$lib/mail/Login.svelte'
import { renderMailTemplate } from '$lib/mail/util';

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
	const mailBody = renderMailTemplate(LoginMail, { callbackUrl: url });
	const data = {
		api_key: env.SMTP2GO_API_KEY,
		to: [identifier],
		sender: provider.from,
		subject: 'Sign in to "clean"',
		// text_body: textMailTemplate(url),
		html_body: mailBody ?? '',
	};
	await fetch(mailApiUrl, {
		method: 'POST',
		body: JSON.stringify(data),
	});
}