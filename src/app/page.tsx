import { redirect } from 'next/navigation';

export default function Page() {
	if (process.env.MAINTENANCE_MODE === 'true') {
		redirect('/maintenance');
	}

	return null;
}
