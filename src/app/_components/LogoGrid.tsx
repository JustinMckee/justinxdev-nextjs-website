'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const logos = [
	{ name: 'JavaScript', class: 'devicon-javascript-plain' },
	{ name: 'React', class: 'devicon-react-original' },
	{ name: 'Next.js', class: 'devicon-nextjs-plain' },
	{ name: 'TypeScript', class: 'devicon-typescript-plain' },
	{ name: 'Tailwind CSS', class: 'devicon-tailwindcss-plain' },
	{ name: 'HTML5', class: 'devicon-html5-plain' },
	{ name: 'CSS3', class: 'devicon-css3-plain' },
	{ name: 'Node.js', class: 'devicon-nodejs-plain' },
	{ name: 'Sass', class: 'devicon-sass-original' },
	{ name: 'MobX', class: 'devicon-mobx-plain' },
	{ name: 'Redux', class: 'devicon-redux-original' },
	{ name: 'Jest', class: 'devicon-jest-plain' },
	{ name: 'AWS', class: 'devicon-amazonwebservices-plain-wordmark' },
	{ name: 'Storybook', class: 'devicon-storybook-plain' },
	{ name: 'Material UI', class: 'devicon-materialui-plain' },
	{ name: 'Bootstrap', class: 'devicon-bootstrap-plain' },
	{ name: 'PostgreSQL', class: 'devicon-postgresql-plain' },
	{ name: 'Prisma', class: 'devicon-prisma-original' },
	{ name: 'Chart.js', class: 'devicon-chartjs-plain' },
	{ name: 'D3.js', class: 'devicon-d3js-plain' },
	{ name: 'Vercel', class: 'devicon-vercel-original' },
	{ name: 'Travis CI', class: 'devicon-travis-plain' },
	{ name: 'Circle CI', class: 'devicon-circleci-plain' },
	{ name: 'Jenkins', class: 'devicon-jenkins-plain' },
];

export default function LogoGrid() {
	// Logos we start displaying when component renders. We don't want to ever update this during an animation cycle. It would rerender the component.
	const [currentlyDisplayedLogos, setCurrentlyDisplayedLogos] = useState<
		typeof logos
	>(logos.slice(0, 5));
	// Ref to keep track of all logos that have already been displayed.
	const displayedLogosRef = useRef(currentlyDisplayedLogos);
	// Ref to keep track of all available slots for logos to be displayed in.
	const logoSlotRefs = useRef<(HTMLDivElement | null)[]>([]);
	const usedLogoSlotsRef = useRef<Set<number>>(new Set());
	// The timeline we will use to control the continuous animation.
	const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
	// The first index of the array that we are allowed to pick logos from. If there are 5 slots, we start picking from index 5 (6th logo) onward.
	const nextLogoIndexRef = useRef(5);

	const startContinuousAnimation = (masterTl: gsap.core.Timeline) => {
		const animateNextReplacement = () => {
			// Get available logos that are not currently displayed
			const previouslyDisplayedLogos = displayedLogosRef.current.map(
				(logo) => logo.name
			);
			const availableLogos = logos.filter(
				(logo) => !previouslyDisplayedLogos.includes(logo.name)
			);

			// If no available logos (shouldn't happen with our logo count), restart from beginning
			if (availableLogos.length === 0) {
				nextLogoIndexRef.current = 0;
				return;
			}

			// Pick a random logo from available ones
			const randomLogoIndex = Math.floor(Math.random() * availableLogos.length);
			const nextLogo = availableLogos[randomLogoIndex];
			// Update the displayed logos ref to include the new logo
			displayedLogosRef.current = [...displayedLogosRef.current, nextLogo];

			const chooseUnusedLogoSlot = () => {
				if (usedLogoSlotsRef.current.size === 5) {
					usedLogoSlotsRef.current.clear();
				}

				let slot: number;
				do {
					// Pick random slot to replace
					slot = Math.floor(Math.random() * 5);
				} while (usedLogoSlotsRef.current.has(slot));

				return slot;
			};
			const randomLogoSlot = chooseUnusedLogoSlot();
			const logoSlot = logoSlotRefs.current[randomLogoSlot];
			usedLogoSlotsRef.current.add(randomLogoSlot);

			if (!logoSlot) return;

			// Fade out current logo at random position
			masterTl
				.to(logoSlot, {
					opacity: 0,
					duration: 0.3,
					ease: 'power2.inOut',
				})
				// Update the logo during opacity 0
				.call(() => {
					setCurrentlyDisplayedLogos((prev) => {
						const newDisplayed = [...prev];
						newDisplayed[randomLogoSlot] = nextLogo;
						return newDisplayed;
					});
				})
				// Fade in new logo
				.to(logoSlot, {
					opacity: 1,
					duration: 0.3,
					ease: 'power2.inOut',
				})
				// Wait 1 seconds before next replacement
				.to(
					{},
					{
						duration: 1,
						onComplete: animateNextReplacement,
					}
				);
		};

		animateNextReplacement();
	};

	useEffect(() => {
		// Set initial opacity to 1
		gsap.set(logoSlotRefs.current, { opacity: 1 });

		// Create master timeline for infinite animation
		const masterTl = gsap.timeline({ repeat: -1 });

		// Initial display time (3 seconds)
		masterTl
			.to({}, { duration: 3 })
			.add(() => startContinuousAnimation(masterTl));

		masterTimelineRef.current = masterTl;

		return () => {
			if (masterTimelineRef.current) {
				masterTimelineRef.current.kill();
			}
		};
	}, []);

	return (
		<>
			<link
				rel='stylesheet'
				href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
			/>
			<div className='flex flex-wrap justify-center items-center my-8'>
				{currentlyDisplayedLogos.map((logo, index) => (
					<div
						key={`${logo.name}-${index}`}
						className='flex-1 basis-1/5 aspect-square'>
						<div
							ref={(el) => {
								logoSlotRefs.current[index] = el;
							}}
							className='w-full h-full m-4 flex items-center justify-center flex-col gap-2'>
							<i className={`${logo.class} text-7xl`}></i>
							<span className='text-[clamp(0.5rem,1vw,0.75rem)] text-center'>
								{logo.name}
							</span>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
