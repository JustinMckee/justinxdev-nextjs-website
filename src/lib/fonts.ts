import { Archivo_Narrow, Geist, Geist_Mono } from 'next/font/google';

export const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

export const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const archivoNarrow = Archivo_Narrow({
	weight: ['400', '600'],
	fallback: ['Arial'],
	variable: '--typeface-archivo-narrow',
	subsets: ['latin'],
});
