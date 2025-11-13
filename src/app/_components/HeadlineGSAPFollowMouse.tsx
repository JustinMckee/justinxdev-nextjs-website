'use client';
import { gsap } from 'gsap';
import { useEffect } from 'react';
export default function HeadlineGSAPFollowMouse() {
	useEffect(() => {
		/*
		 * Dynamic heading mousemove effect
		 */
		const heading = document.querySelector('.gs-dynamic-heading');
		const textChunks = heading?.querySelectorAll('.gs-dynamic-heading__text');
		const callbacksArray: Array<(event: MouseEvent) => void> = [];
		textChunks?.forEach((textChunk, index) => {
			const onMouseMove = (event: MouseEvent) => {
				const viewportHeight = window.innerHeight;
				const viewportWidth = window.innerWidth;
				const cursorY = event.clientY;
				const cursorX = event.clientX;
				// Calculate the relative position of the cursor (0 at top/left, 1 at bottom/right)
				const relativeY = cursorY / viewportHeight;
				const relativeX = cursorX / viewportWidth;
				gsap.to(textChunk, {
					y: (relativeY - 0.5) * (25 * (index + 1)), // Slight vertical movement
					x: (relativeX - 0.5) * (25 * (index + 1)), // Slight horizontal movement
					// y: (relativeY - 0.5) * 50, // Slight vertical movement
					// x: (relativeX - 0.5) * 50, // Slight horizontal movement
					// scale: 1 + relativeY * 0.2, // Scale based on cursor position
					// letterSpacing: (relativeX - 0.5) * 500, // Overlay effect
					// lineHeight: relativeY > 0.5 ? '1' : '1.5', // Adjust line height
					duration: 0.3,
					ease: 'ease1.inOut',
				});
			};
			callbacksArray.push(onMouseMove);
			// Add mousemove event listener
			window.addEventListener('mousemove', onMouseMove);
		});

		// Cleanup event listener on component unmount
		return () => {
			callbacksArray.forEach((onMouseMove) => {
				window.removeEventListener('mousemove', onMouseMove);
			});
		};
	}, []);
	return (
		<h2 className='gs-dynamic-heading md:text-6xl lg:text-7xl font-bold text-center mb-8 leading-tight'>
			<span className='gs-dynamic-heading__text inline-block text-5xl leading-none'>
				Build fast.
			</span>
			<br />
			<span className='gs-dynamic-heading__text inline-block text-7xl leading-none'>
				Scale smart.
			</span>
			<br />
			<span className='gs-dynamic-heading__text inline-block text-9xl leading-none'>
				Grow loud.
			</span>
		</h2>
	);
}
