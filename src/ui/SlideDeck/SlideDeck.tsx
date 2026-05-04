'use client';
import Image from 'next/image';
import styles from './SlideDeck.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const SlideDeck = () => {
	useGSAP(() => {
		setupSlideAnimations();
	}, []);
	return (
		<div
			className={`${styles['slide-deck']}  mx-auto flex flex-col items-center gap-8`}>
			<div className={`${styles.slide} w-full my-4`}>
				<div className={styles.curtain}></div>
				<div
					className={`${styles['image-wrapper']} rounded-lg aspect-[2.39/1] mx-auto`}>
					<div className={`${styles.content}`}>
						<h2 className='text-3xl font-bold mb-4 text-center'>SlideDeck</h2>
						<p className='text-lg text-center'>
							An intuitive presentation tool designed for developers and
							designers, enabling seamless creation and delivery of engaging
							slideshows with code-centric features.
						</p>
						<a
							href='#'
							className='p-4 bg-blue-600 text-white w-fit rounded-lg text-center self-center mt-6 hover:bg-blue-700 transition-colors duration-300'>
							Check it out
						</a>
					</div>
					<Image
						src='/seed/slide-deck/desk-a.jpg'
						alt='SlideDeck Project Screenshot 1'
						width={1279}
						height={854}
						className='w-full h-auto rounded-lg'
					/>
				</div>
			</div>
			<div className={`${styles.slide} w-full my-8`}>
				<div className={styles.curtain}></div>
				<div
					className={`${styles['image-wrapper']} rounded-lg aspect-[2.39/1] mx-auto`}>
					<div className={`${styles.content}`}>
						<h2 className='text-3xl font-bold mb-4 text-center'>SlideDeck</h2>
						<p className='text-lg text-center'>
							An intuitive presentation tool designed for developers and
							designers, enabling seamless creation and delivery of engaging
							slideshows with code-centric features.
						</p>
						<a
							href='#'
							className='p-4 bg-blue-600 text-white w-fit rounded-lg text-center self-center mt-6 hover:bg-blue-700 transition-colors duration-300'>
							Check it out
						</a>
					</div>
					<Image
						src='/seed/slide-deck/desk-b.jpg'
						alt='SlideDeck Project Screenshot 1'
						width={1280}
						height={853}
						className='w-full h-auto rounded-lg'
					/>
				</div>
			</div>
			<div className={`${styles.slide} w-full my-12`}>
				<div className={styles.curtain}></div>
				<div
					className={`${styles['image-wrapper']} rounded-lg aspect-[2.39/1] mx-auto`}>
					<div className={`${styles.content}`}>
						<h2 className='text-3xl font-bold mb-4 text-center'>SlideDeck</h2>
						<p className='text-lg text-center'>
							An intuitive presentation tool designed for developers and
							designers, enabling seamless creation and delivery of engaging
							slideshows with code-centric features.
						</p>
						<a
							href='#'
							className='p-4 bg-blue-600 text-white w-fit rounded-lg text-center self-center mt-6 hover:bg-blue-700 transition-colors duration-300'>
							Check it out
						</a>
					</div>
					<Image
						src='/seed/slide-deck/desk-c.jpg'
						alt='SlideDeck Project Screenshot 1'
						width={1280}
						height={853}
						className='w-full h-auto rounded-lg'
					/>
				</div>
			</div>
		</div>
	);
};

const configAllSlidesStartPosition = () => {
	const deck = document.querySelector(`.${styles['slide-deck']}`);
	const slides = deck!.querySelectorAll(`.${styles.slide}`);
	slides.forEach((slide, index) => {
		const content = slide.querySelector(`.${styles.content}`);
		if (content) {
			gsap.set(content, { opacity: 0 });
		}
		gsap.set(slide, {
			position: 'absolute',
			top: `${75 * index}px`,
			zIndex: slides.length - index,
			width: `${100 - 5 * index}%`,
		});
		// if (index === 0) {
		// 	const curtain = slide.querySelector(`.${styles.curtain}`);
		// 	gsap.set(curtain, {
		// 		'--cutout-width': '100%',
		// 	});
		// }
	});
};

const setupSlideAnimations = () => {
	configAllSlidesStartPosition();
	const pinnedSectionMasterTimeline = pinSection();
	const deck = document.querySelector(`.${styles['slide-deck']}`);
	const slides = deck!.querySelectorAll(`.${styles.slide}`);

	slides.forEach((slide, index) => {
		const curtain = slide.querySelector(`.${styles.curtain}`);
		const content = slide.querySelector(`.${styles.content}`);

		// Add a label for each slide's start position
		const slideStartTime =
			index === 0 ? 0 : pinnedSectionMasterTimeline.duration();
		pinnedSectionMasterTimeline.addLabel(
			`slide-${index}-start`,
			slideStartTime,
		);

		// Animate the curtain
		pinnedSectionMasterTimeline.to(curtain, {
			'--cutout-width': '100%',
			duration: 5,
			ease: 'power1.in',
		});

		if (index > 0) {
			// Animate width and position at the same time as curtain
			pinnedSectionMasterTimeline.to(
				slide,
				{
					width: '100%',
					top: `0px`,
					duration: 5,
					ease: 'power1.in',
				},
				'<',
			);
		}

		if (content) {
			// Fade in content after curtain animation
			pinnedSectionMasterTimeline.to(
				content,
				{
					opacity: 1,
					duration: 3,
					ease: 'power2.inOut',
				},
				'>+1',
			);
		}

		// Hold the slide in view for a moment
		pinnedSectionMasterTimeline.to({}, { duration: 5 });
	});

	// Now add the "move off screen" animations that overlap with next slides
	slides.forEach((slide, index) => {
		if (index < slides.length - 1) {
			// Calculate when the next slide starts
			const nextSlideStartLabel = `slide-${index + 1}-start`;

			pinnedSectionMasterTimeline.to(
				slide,
				{
					top: `-${slides[0].clientHeight * 2}px`,
					duration: 5,
					ease: 'power1.in',
				},
				nextSlideStartLabel, // Now this label exists!
			);
		}
	});

	return pinnedSectionMasterTimeline;
};

const pinSection = () => {
	const pinnedSection = document.querySelector('#project-stack');
	const slides = pinnedSection!.querySelectorAll(`.${styles.slide}`);
	return gsap.timeline({
		scrollTrigger: {
			trigger: pinnedSection,
			pin: true,
			start: 'center center',
			end: `+=${slides.length * 200}%`,
			scrub: true,
			markers: false,
			pinSpacing: true,
		},
	});
};
