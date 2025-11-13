'use client';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);

export default function HeadlineGSAP() {
	useGSAP(() => {
		animateTagline();
	}, []);

	return (
		<div className='gs-text-headline-animation'>
			<span className='gs-proposition block'>Hi, I&apos;m&nbsp;</span>
			<span className='gs-noun-wrapper'>
				<span className='gs-highlight'></span>
				<span className='gs-noun'></span>
			</span>
			<span className='gs-adjective'></span>
			<span className='gs-cursor'>_</span>
		</div>
	);
}

const animateTagline = () => {
	// collection of phrases to cycle through.
	const phrases = [
		{
			noun: 'Justin',
			adjective: 'McKee.',
		},
		{
			noun: 'Design',
			adjective: 'driven.',
		},
		{
			noun: 'Data',
			adjective: 'fueled.',
		},
		{
			noun: 'Frontend',
			adjective: 'obsessed.',
		},
	];

	// animate the cursor to blink.
	gsap.to('.gs-cursor', {
		opacity: 0,
		repeat: -1,
		yoyo: true,
		duration: 0.5,
	});

	// master timeline to repeat forever.
	const masterTimeline = gsap.timeline({
		repeat: -1,
		toggleActions: 'play none none reset',
		paused: true, // Start paused so we can control it with ScrollTrigger
	});

	// for each phrase, create a timeline and add it to the master timeline.
	phrases.forEach((phrase) => {
		// timeline for each phrase.
		const phraseTimeline = gsap.timeline({
			repeat: 1,
			yoyo: true,
		});
		// animate the noun, highlight, and adjective.
		phraseTimeline
			.to({}, { delay: 0.75 }) // initial delay
			// .set('.gs-noun', { y: '1em' })
			// .to(
			// 	'.gs-highlight',
			// 	{
			// 		delay: 0.5,
			// 		duration: 0.33,
			// 		opacity: 1,
			// 		left: 0,
			// 		height: '100%',
			// 		width: '100%',
			// 		ease: 'power4.in',
			// 	},
			// 	'<'
			// )
			.to(
				'.gs-noun',
				{
					duration: 0.5,
					text: phrase.noun + ' ',
					ease: `steps(${phrase.noun.length})`,
				},
				'<'
			)
			// .to('.gs-noun', {
			// 	duration: 0.33,
			// 	opacity: 1,
			// 	//y: '0',
			// 	ease: 'step',
			// })
			.to('.gs-adjective', {
				// delay: 0.25,
				duration: 0.5,
				text: phrase.adjective,
				ease: `steps(${phrase.adjective.length})`,
			})
			.to({}, { duration: 1 });

		masterTimeline.add(phraseTimeline);
	});

	// Create ScrollTrigger to control the animation based on viewport visibility
	ScrollTrigger.create({
		trigger: '.gs-text-headline-animation', // Use the first element as trigger
		start: 'top bottom', // Start when top of element hits bottom of viewport
		end: 'bottom top', // End when bottom of element hits top of viewport
		onEnter: () => {
			// Reset and play from beginning when entering viewport
			masterTimeline.restart();
		},
		onEnterBack: () => {
			// Reset and play from beginning when scrolling back up
			masterTimeline.restart();
		},
		onLeave: () => {
			// Pause when leaving viewport
			masterTimeline.pause();
		},
		onLeaveBack: () => {
			// Pause when scrolling up past the element
			masterTimeline.pause();
		},
	});

	// Start the animation initially
	masterTimeline.play();
};
