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
					y: (relativeY - 0.5) * (50 * (index + 1)), // Slight vertical movement
					x: (relativeX - 0.5) * (50 * (index + 1)), // Slight horizontal movement
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
		<div className={`gs-dynamic-heading text-center `}>
			<h2
				className={`gs-dynamic-heading__text text-lg md:text-6xl xl:text-7xl font-bold mb-8 leading-tight `}>
				<span className='block text-normal text-normal md:text-lg leading-none gs-dynamic-heading__text mb-5 md:mb-2 font-normal opacity-50'>
					(My Motto)
				</span>
				<span
					className={`bg-hatch gs-dynamic-heading__text inline-block text-3xl md:text-4xl xl:text-5xl leading-none whitespace-nowrap `}>
					Build fast.
				</span>
				<br />
				<span
					className={`bg-hatch gs-dynamic-heading__text inline-block text-5xl md:text-6xl xl:text-7xl leading-none whitespace-nowrap `}>
					Scale smart.
				</span>
				<br />
				<span
					className={`bg-hatch gs-dynamic-heading__text inline-block  text-7xl md:text-8xl xl:text-9xl leading-none whitespace-nowrap `}>
					Grow loud.
				</span>
			</h2>
			{/* <p className='gs-dynamic-heading__text text-lg md:text-xl xl:text-3xl text-center leading-none max-w-3xl mx-auto opacity-70'>
				I help teams move faster, scale smarter, and grow with impact.
			</p> */}
		</div>
	);
}
