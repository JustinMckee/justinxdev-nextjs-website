'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useShuffle } from '@/hooks/useShuffle';
import {
	AmazonwebservicesPlainWordmarkIcon,
	BootstrapPlainIcon,
	// ChartjsPlainIcon,
	CircleciPlainIcon,
	Css3PlainIcon,
	D3jsPlainIcon,
	Html5PlainIcon,
	JavascriptPlainIcon,
	JenkinsPlainIcon,
	JestPlainIcon,
	MaterialuiPlainIcon,
	MobxPlainIcon,
	NextjsPlainIcon,
	NodejsPlainIcon,
	PostgresqlPlainIcon,
	PrismaOriginalIcon,
	ReactOriginalIcon,
	ReduxOriginalIcon,
	SassOriginalIcon,
	StorybookPlainIcon,
	// TailwindcssPlainIcon,
	TravisPlainIcon,
	TypescriptPlainIcon,
	VercelOriginalIcon,
} from '@devicon/react';

const logos = [
	{ name: 'JavaScript', devicon: JavascriptPlainIcon, color: '#F0DB4F' },
	{ name: 'React', devicon: ReactOriginalIcon, color: '#61DAFB' },
	{ name: 'Next.js', devicon: NextjsPlainIcon, color: '#0070F3' },
	{ name: 'TypeScript', devicon: TypescriptPlainIcon, color: '#3178C6' },
	// { name: 'Tailwind CSS', devicon: TailwindcssPlainIcon },
	{ name: 'HTML5', devicon: Html5PlainIcon, color: '#E34F26' },
	{ name: 'CSS3', devicon: Css3PlainIcon, color: '#1572B6' },
	{ name: 'Node.js', devicon: NodejsPlainIcon, color: '#339933' },
	{ name: 'Sass', devicon: SassOriginalIcon, color: '#CC6699' },
	{ name: 'MobX', devicon: MobxPlainIcon, color: '#FF9955' },
	{ name: 'Redux', devicon: ReduxOriginalIcon, color: '#764ABC' },
	{ name: 'Jest', devicon: JestPlainIcon, color: '#C21325' },
	{
		name: 'AWS',
		devicon: AmazonwebservicesPlainWordmarkIcon,
		color: '#FF9900',
	},
	{ name: 'Storybook', devicon: StorybookPlainIcon, color: '#FF4785' },
	{ name: 'Material UI', devicon: MaterialuiPlainIcon, color: '#007FFF' },
	{ name: 'Bootstrap', devicon: BootstrapPlainIcon, color: '#7952B3' },
	{ name: 'PostgreSQL', devicon: PostgresqlPlainIcon, color: '#336791' },
	{ name: 'Prisma', devicon: PrismaOriginalIcon, color: '#9c9c9cff' },
	// { name: 'Chart.js', devicon: ChartjsPlainIcon },
	{ name: 'D3.js', devicon: D3jsPlainIcon, color: '#F9A03C' },
	{ name: 'Vercel', devicon: VercelOriginalIcon, color: '#fff' },
	{ name: 'Travis CI', devicon: TravisPlainIcon, color: '#3EAAAF' },
	{ name: 'Circle CI', devicon: CircleciPlainIcon, color: '#2BAEEC' },
	{ name: 'Jenkins', devicon: JenkinsPlainIcon, color: '#D24939' },
];

export default function LogoGrid() {
	const numSlots = 5;
	const logoSlotRefs = useRef<(HTMLDivElement | null)[]>([]);
	const hatchRefs = useRef<(HTMLDivElement | null)[]>([]);
	const { activeItemsState, getNextItem, getNextSlot, replaceItemInSlotState } =
		useShuffle(logos, numSlots, { initialShuffle: false });

	const hexToRgb = (hex: string) => {
		const normalized = hex.replace('#', '').trim();
		if (normalized.length === 3) {
			const [r, g, b] = normalized.split('');
			return `${parseInt(r + r, 16)} ${parseInt(g + g, 16)} ${parseInt(b + b, 16)}`;
		}
		if (normalized.length >= 6) {
			const r = normalized.slice(0, 2);
			const g = normalized.slice(2, 4);
			const b = normalized.slice(4, 6);
			return `${parseInt(r, 16)} ${parseInt(g, 16)} ${parseInt(b, 16)}`;
		}
		return '0 0 0';
	};

	const startLogoAnimationLoop = () => {
		const animateNextReplacement = () => {
			const nextLogo = getNextItem();
			const nextSlot = getNextSlot();
			if (!nextLogo || typeof nextSlot !== 'number') return;
			const logoSlot = logoSlotRefs.current[nextSlot];
			const hatchOverlay = hatchRefs.current[nextSlot];
			if (!logoSlot) return;
			if (!hatchOverlay) return;
			const tl = gsap.timeline();
			tl.set(hatchOverlay, { opacity: 0 });
			tl
				// 1) For a smooth transition, start by blurring the logo slot
				.to(logoSlot, {
					filter: 'blur(50px)',
					duration: 1,
					ease: 'power2.inOut',
				})
				// 2) After a 3/100s delay from the start of the last tween, fade out the logo slot
				.to(
					logoSlot,
					{
						opacity: 0,
						duration: 0.5,
						ease: 'power2.in',
					},
					'< +=0.3',
				)
				// 3) While the logo slot is faded out, replace the logo
				.call(() => {
					replaceItemInSlotState(nextSlot, nextLogo);
				})

				// 4) Ensure there isn't a blip of the old logo during the swap by doing nothing for 1/2s
				// .to({}, { duration: 0.5 })
				.fromTo(
					hatchOverlay,
					{ opacity: 0 },
					{
						opacity: 0.8,
						duration: 3,
						ease: 'power2.inOut',
						immediateRender: false,
					},
					'<',
				)
				// 5) Fade in logo slot which now contains the new logo
				.to(
					logoSlot,
					{
						opacity: 0,
						duration: 0.5,
						ease: 'power2.in',
					},
					'<',
				)
				// 6) For a smoother transition, remove blur after a 3/100s delay from the start of the previous fade-in tween
				.to(
					logoSlot,
					{
						filter: 'blur(0px)',
						duration: 1,
						ease: 'power2.inOut',
						opacity: 1,
					},
					'<+=0.3',
				)
				.to(
					{},
					{
						duration: 3,
					},
				)
				.to(
					hatchOverlay,
					{
						opacity: 0,
						duration: 5,
						ease: 'power2.inOut',
					},
					'<',
				);

			const overlapSeconds = 6; // Time in seconds to start the next animation before the current one finishes
			const overlapDelay = Math.max(tl.duration() - overlapSeconds, 0);
			gsap.delayedCall(overlapDelay, animateNextReplacement);
		};

		animateNextReplacement();
	};

	useGSAP(() => {
		// This will ensure the GSAP context is refreshed and the animations are properly registered.
		// Create master timeline for infinite animation.
		// reset();
		startLogoAnimationLoop();
	});

	return (
		<div className='flex flex-wrap justify-center items-center my-8'>
			{activeItemsState.map((logo, index) => (
				<div
					key={`logo-slot-${index}`}
					className='flex-none basis-1/3 md:basis-1/5 aspect-square'>
					<div
						ref={(el) => {
							logoSlotRefs.current[index] = el;
						}}
						className={`relative w-full h-full flex justify-center items-center flex-col gap-2 overflow-hidden p-2`}>
						<div
							ref={(el) => {
								hatchRefs.current[index] = el;
							}}
							style={
								{
									'--bg-pattern-color-mix': `color-mix(
										in oklab,
										${logo.color} 50%,
										transparent)`,
									'--bg-hatch-border-rgb': hexToRgb(logo.color),
									opacity: 0,
								} as React.CSSProperties
							}
							className='pointer-events-none absolute inset-0 bg-hatch opacity-0'
						/>
						<div className='flex flex-col grow w-full items-center justify-center pt-2'>
							<logo.devicon
								color={logo.color}
								className='grow !w-full sm:max-w-[50%]'
							/>
						</div>
						<span className='text-[clamp(0.8rem,1vw,1.2rem)] pb-2 text-center opacity-70'>
							{logo.name}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}
