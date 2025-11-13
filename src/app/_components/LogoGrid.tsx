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
	const [displayedLogos, setDisplayedLogos] = useState<typeof logos>(
		logos.slice(0, 5)
	);
	const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
	const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
	const nextLogoIndexRef = useRef(5); // Start from 6th logo (index 5)

	const startContinuousAnimation = (masterTl: gsap.core.Timeline) => {
		const animateNextReplacement = () => {
			// Get available logos that are not currently displayed
			const currentlyDisplayedNames = displayedLogos.map((logo) => logo.name);
			const availableLogos = logos.filter(
				(logo) => !currentlyDisplayedNames.includes(logo.name)
			);

			// If no available logos (shouldn't happen with our logo count), restart from beginning
			if (availableLogos.length === 0) {
				nextLogoIndexRef.current = 0;
				return;
			}

			// Pick a random logo from available ones
			const randomLogoIndex = Math.floor(Math.random() * availableLogos.length);
			const nextLogo = availableLogos[randomLogoIndex];

			// Pick random position (0-4) to replace
			const randomPosition = Math.floor(Math.random() * 5);
			const logoRef = logoRefs.current[randomPosition];

			if (!logoRef) return;

			// Fade out current logo at random position
			masterTl
				.to(logoRef, {
					opacity: 0,
					duration: 0.3,
					ease: 'power2.inOut',
				})
				// Update the logo during opacity 0
				.call(() => {
					setDisplayedLogos((prev) => {
						const newDisplayed = [...prev];
						newDisplayed[randomPosition] = nextLogo;
						return newDisplayed;
					});
				})
				// Fade in new logo
				.to(logoRef, {
					opacity: 1,
					duration: 0.3,
					ease: 'power2.inOut',
				})
				// Wait 3 seconds before next replacement
				.to(
					{},
					{
						duration: 3,
						onComplete: animateNextReplacement,
					}
				);
		};

		animateNextReplacement();
	};

	useEffect(() => {
		// Set initial opacity to 1
		gsap.set(logoRefs.current, { opacity: 1 });

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
				{displayedLogos.map((logo, index) => (
					<div
						key={`${logo.name}-${index}`}
						className='flex-1 basis-1/5 aspect-square'>
						<div
							ref={(el) => {
								logoRefs.current[index] = el;
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
