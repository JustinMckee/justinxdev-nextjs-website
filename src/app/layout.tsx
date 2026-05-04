import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../ui/header/header';
import { Footer } from '@/ui/Footer/Footer';
import { archivoNarrow, geistSans, geistMono } from '@/lib/fonts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
	? new URL(process.env.NEXT_PUBLIC_SITE_URL)
	: new URL('http://localhost:3000');
const siteTitle = 'Justin McKee';
const siteDescription =
	'Frontend engineer focused on strategic UX, high-impact UI, and scalable web experiences.';

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title: {
		default: siteTitle,
		template: '%s | Justin McKee',
	},
	description: siteDescription,
	openGraph: {
		title: siteTitle,
		description: siteDescription,
		url: '/',
		siteName: 'Justin McKee',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: '/opengraph-image',
				width: 1200,
				height: 630,
				alt: 'Justin McKee',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteTitle,
		description: siteDescription,
		images: ['/twitter-image'],
	},
	icons: {
		icon: '/favicon.svg',
		apple: '/apple-icon',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${archivoNarrow.variable} antialiased relative overflow-x-hidden`}>
				<Header />
				<main className='site-grid font-sans'>
					<div className='site-gutter-left bg-hatch'></div>
					{children}
					<Footer />
					<div className='site-gutter-right bg-hatch'></div>
				</main>
			</body>
		</html>
	);
}
