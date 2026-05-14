'use server';

import { Resend } from 'resend';

export type FooterFormState = {
	ok: boolean;
	error?: string;
};

const isValidEmail = (value: string) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function submitFooterForm(
	prevState: FooterFormState,
	formData: FormData,
): Promise<FooterFormState> {
	const apiKey = process.env.RESEND_API_KEY;
	console.log('RESEND_API_KEY present:', Boolean(apiKey));
	if (!apiKey) {
		return {
			ok: false,
			error: 'Email service is unavailable right now. Please try again later.',
		};
	}
	const resend = new Resend(apiKey);

	const name = String(formData.get('name') || '').trim();
	const email = String(formData.get('email') || '').trim();
	const heard = String(formData.get('heard') || '').trim();
	const message = String(formData.get('message') || '').trim();
	const title = String(formData.get('title') || '').trim();

	if (title) {
		return {
			ok: false,
			error: 'Unable to submit. Please try again.',
		};
	}

	if (!name || !email || !heard || !message) {
		return {
			ok: false,
			error: 'Please complete all fields before submitting.',
		};
	}

	if (!isValidEmail(email)) {
		return {
			ok: false,
			error: 'Please enter a valid email address.',
		};
	}

	try {
		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: 'thisisjustinmckee@gmail.com',
			subject: `${name} sent a message`,
			text: [
				`Name: ${name}`,
				`Email: ${email}`,
				`How did you hear about me: ${heard}`,
				`Message: ${message}`,
			]
				.filter(Boolean)
				.join('\n'),
		});
	} catch {
		return {
			ok: false,
			error: 'Something went wrong while sending. Please try again.',
		};
	}

	return { ok: true };
}
