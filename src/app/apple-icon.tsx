import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
	return new ImageResponse(
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#0b0f1a',
				backgroundImage:
					'linear-gradient(135deg, rgba(0,124,240,0.35), rgba(0,223,216,0.35))',
				color: '#ffffff',
				fontSize: 72,
				fontWeight: 700,
				letterSpacing: '-0.02em',
			}}>
			JM
		</div>,
		size,
	);
}
