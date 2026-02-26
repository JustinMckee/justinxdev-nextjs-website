'use client';
import HeadlineGSAPFollowMouse from '../HeadlineGSAPFollowMouse';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { delay } from 'motion';

gsap.registerPlugin(ScrollTrigger);

export const MottoTaglineSection = () => {
	useGSAP(() => {
		setupPinnedAnimations();
	}, []);
	return (
		<section
			id='collage'
			className='w-full flex-col py-35 z-[5] relative bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_33%)]'>
			<div className='headline w-full max-w-5xl mx-auto mb-25'>
				<HeadlineGSAPFollowMouse />
			</div>
			<div className='relative'>
				<Image
					src='/collage.webp'
					alt='Work collage'
					width={2880}
					height={1940}
					className='image w-full h-auto'
				/>
			</div>
			{/* <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_33%)]' /> */}
		</section>
	);
};

function pinSection() {
	// Select all elements with the class `.gsap-pinned-section`
	const pinnedSection = document.querySelector('#collage');
	const headline = pinnedSection?.querySelector('.headline');
	const image = pinnedSection?.querySelector('.image');

	// Loop through each element and apply ScrollTrigger
	if (!headline || !image) {
		return gsap.timeline();
	}

	// gsap.set(headline, { y: 40 });
	// gsap.to(headline, {
	// 	y: 0,
	// 	ease: 'none',
	// 	scrollTrigger: {
	// 		trigger: headline,
	// 		start: 'top 85%',
	// 		end: 'center center',
	// 		scrub: 1,
	// 	},
	// });

	const delayDistance = 500;
	const overlapDistance = image.clientHeight;
	const totalDistance = delayDistance + overlapDistance;

	ScrollTrigger.create({
		trigger: headline,
		pin: true,
		start: 'center center',
		end: `+=${totalDistance}`,
		scrub: 1,
		// anticipatePin: 5,
		// once: true,
		//markers: true,
		pinSpacing: false,
	});

	ScrollTrigger.create({
		trigger: headline,
		pin: image,
		start: 'center center',
		end: `+=${delayDistance}`,
		scrub: 1,
		markers: true,
		pinSpacing: false,
	});

	const timeline = gsap
		.timeline({
			scrollTrigger: {
				trigger: headline,
				start: 'center center',
				end: `+=${delayDistance}`,
				scrub: 1,
				markers: true,
				pinSpacing: false,
			},
		})
		.fromTo(
			headline,
			{
				opacity: 1,
				immediateRender: false,
			},
			{
				opacity: 0,
				ease: 'none',
				duration: 0.1,
			},
			0.1,
		);

	return timeline;
}
function setupPinnedAnimations() {
	pinSection();
}
