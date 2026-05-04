'use client';
import HeadlineGSAPFollowMouse from '../HeadlineGSAPFollowMouse';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MottoTaglineSection = () => {
	useGSAP(() => {
		setupPinnedAnimations();
	}, []);
	return (
		<section
			id='collage'
			className='w-full flex-col py-35 site-section full-bleed-bg-top-fade'>
			<div className='site-section-content'>
				<div className='headline w-full mx-auto mb-25 center py-12'>
					<HeadlineGSAPFollowMouse />
				</div>
				<div className='relative full-bleed collage-image'>
					<Image
						src='/collage.webp'
						alt='Work collage'
						width={2880}
						height={1940}
						className='image w-full h-auto'
					/>
				</div>
			</div>
			{/* <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_33%)]' /> */}
		</section>
	);
};

function pinSection() {
	// Select all elements with the class `.gsap-pinned-section`
	const pinnedSection = document.querySelector('#collage');
	const pinTarget = pinnedSection?.querySelector('.site-section-content');
	const headline = pinnedSection?.querySelector('.headline');
	const image = pinnedSection?.querySelector('.image');
	const imageWrap = pinnedSection?.querySelector('.collage-image');

	// Loop through each element and apply ScrollTrigger
	if (!headline || !image || !imageWrap) {
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

	const fadeDistance = 800;

	const timeline = gsap.timeline({
		scrollTrigger: {
			trigger: pinnedSection,
			start: 'top top',
			end: `+=${fadeDistance}`,
			scrub: 1,
			pin: pinTarget ?? true,
			pinSpacing: true,
			markers: false,
			// onEnter: () => {
			// 	gsap.set(imageWrap, {
			// 		position: 'absolute',
			// 		bottom: 0,
			// 		left: 0,
			// 		right: 0,
			// 	});
			// },
			// onEnterBack: () => {
			// 	gsap.set(imageWrap, {
			// 		position: 'absolute',
			// 		bottom: 0,
			// 		left: 0,
			// 		right: 0,
			// 	});
			// },
			// onLeave: () => {
			// 	gsap.set(imageWrap, { clearProps: 'position,bottom,left,right' });
			// },
			// onLeaveBack: () => {
			// 	gsap.set(imageWrap, { clearProps: 'position,bottom,left,right' });
			// },
		},
	});

	timeline.fromTo(
		headline,
		{
			opacity: 1,
			immediateRender: false,
		},
		{
			opacity: 0,
			ease: 'none',
			duration: 1,
		},
		0,
	);

	return timeline;
}
function setupPinnedAnimations() {
	pinSection();
}
