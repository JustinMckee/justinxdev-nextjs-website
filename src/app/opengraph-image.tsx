import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
	return new ImageResponse(
		(
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
					fontSize: 64,
					fontWeight: 700,
					letterSpacing: '-0.02em',
					padding: '80px',
					textAlign: 'left',
				}}
			>
				<div style={{ maxWidth: 900 }}>
					<div style={{ fontSize: 28, opacity: 0.8, marginBottom: 16 }}>
						Justin McKee
					</div>
					<div>Frontend engineer crafting high-impact UI.</div>
				</div>
			</div>
		),
		size,
	);
}
