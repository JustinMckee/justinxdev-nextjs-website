'use client';
import GridDistortion from '@/ui/features/backgrounds/GridDistortion';
import styles from './page.module.scss';
import { useRef } from 'react';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const mouseTrackingLayer = useRef<HTMLDivElement>(null);
	return (
		<>
			<div
				ref={mouseTrackingLayer}
				className='fixed inset-0 z-0 pointer-events-none'
			/>
			{children}
			<div className={styles.gridWrap}>
				<div className='pointer-events-none absolute z-[5] inset-0 bg-gradient-to-t from-black via-black/80 to-transparent via-10%' />
				<div className='pointer-events-none absolute z-[5] inset-0 bg-[radial-gradient(circle_at_66%_50%,transparent_0%,rgba(0,0,0,1)_100%)]' />
				<GridDistortion
					imageSrc='/backgrounds/relief-grid.jpg'
					grid={20}
					mouse={0.1}
					strength={0.15}
					relaxation={0.9}
					className={`${styles.background} z-0`}
					mouseTrackingLayer={mouseTrackingLayer}
				/>
			</div>
		</>
	);
}
