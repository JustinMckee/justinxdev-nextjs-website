import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';

	if (maintenanceMode && request.nextUrl.pathname !== '/maintenance') {
		return NextResponse.redirect(new URL('/maintenance', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|api|maintenance).*)'],
};
