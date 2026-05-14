import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
	return new ImageResponse(
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#0b0f1a',
				// backgroundImage:
				// 	'linear-gradient(135deg, rgba(0,124,240,0.35), rgba(0,223,216,0.35))',
				color: '#ffffff',
				fontSize: 32,
				fontWeight: 700,
				letterSpacing: '-0.02em',
				padding: '80px',
				textAlign: 'left',
			}}>
			<div
				style={{
					maxWidth: 900,
					display: 'flex',
					flexDirection: 'column',
				}}>
				<div style={{ marginBottom: 16 }}>Hello, I'm Justin McKee.</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						fontSize: 64,
						marginBottom: 16,
						backgroundImage: 'linear-gradient(90deg, #007cf0 0%, #00dfd8 100%)',
						backgroundClip: 'text',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						color: 'transparent',
					}}>
					Design Driven.
					<br />
					Data fueled.
					<br />
					Frontend obsessed.
				</div>
				<div>
					A product engineer passionate about strategic UX, high-impact UI, and
					shipped code that actually moves the needle.
				</div>
			</div>
		</div>,
		size,
	);
}
