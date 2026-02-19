import { QuoteBlock } from '@/ui/common/QuoteBlock';
import { TitleBlock } from '@/ui/common/TitleBlock';
import { ImageStack } from '@/ui/common/ImageStack';
import {
	WithSticky,
	StickyItem,
	StickyTrigger,
} from '@/ui/features/WithSticky';
import Image from 'next/image';
import { WithTilt } from '@/ui/features/WithTilt';
import Link from 'next/link';

export default function Page() {
	return (
		<>
			<TitleBlock
				heading='Designing the CX3 Event Ecosystem — UX Architecture & Dynamic Event Infrastructure'
				paragraph='CX3 is Trout Unlimited’s flagship annual gathering. I architected and developed a dynamic event platform that supports complex scheduling, category-driven routing, and configurable registration flows. The system was designed to scale across changing locations, programs, and ticket structures year over year.'
				imageProps={[
					{
						src: '/projects/cx3/cx3-hero-a.jpg',
						width: '1920',
						height: '1343',
						alt: '',
					},
					{
						src: '/projects/cx3/seo-friendly.jpg',
						width: '1920',
						height: '1343',
						alt: '',
					},
				]}
			/>
			<div className='flex flex-col py-[12vh] items-center'>
				<QuoteBlock
					layout='right'
					quote='Justin&#39;s work is not just about pixels; it&#39;s about creating experiences that matter.'
					attribution={{
						source: 'Brennan Sang, Direcotr of Digital, Trout Unlimited, Inc.',
					}}
					images={[
						{
							src: '/projects/cx3/cx3-hero-b.jpg',
							width: '1920',
							height: '1343',
							alt: '',
						},
						{
							src: '/projects/cx3/event-categories.jpg',
							alt: 'Hero image of Justin McKee',
							width: '3200',
							height: '1973',
						},
					]}
				/>
			</div>

			<WithSticky>
				<div className='flex flex-col md:flex-row gap-24'>
					<div className='flex flex-col h-[200vh] md:flex-1 justify-around'>
						<StickyTrigger
							forStickyItem='#a'
							start='top bottom'>
							<div className='flex flex-col gap-[25vh]'>
								<div>
									<h2 className='fluid-font'>
										Platform Architecture & Experience Design
									</h2>
									<p>
										I led the information architecture, UX strategy, and UI
										development for the CX3 event platform, defining how complex
										multi-day programming, ticketing pathways, and content
										hierarchies were structured and navigated.
									</p>
								</div>
								<div>
									<p>
										<strong>Cohesive & SEO-forward</strong>
									</p>
									<p>
										I translated that architecture into a cohesive visual
										interface while implementing a semantic, SEO-forward content
										strategy designed to support discoverability, accessibility,
										and long-term scalability.
									</p>
								</div>
							</div>
						</StickyTrigger>
					</div>

					<div className='md:flex-1 flex self-stretch items-center'>
						<StickyItem id='a'>
							<WithTilt>
								<Image
									src='/projects/cx3/ui-mobile-collage.jpg'
									alt='Hero image of Justin McKee'
									width='1920'
									height='1343'
								/>
							</WithTilt>
						</StickyItem>
					</div>
				</div>

				<div className='flex flex-col md:flex-row gap-24 h-[66vh] items-center'>
					<StickyTrigger
						forStickyItem='#c'
						start='top bottom'>
						<div className='md:flex-1'>
							<h2 className='fluid-font'>
								Dynamic Event Calendar & Search Infrastructure
							</h2>
							<p>
								I architected and developed a dynamic calendar system that
								intelligently orders events relative to the current date,
								ensuring the most relevant programming surfaces first.
							</p>
							<p>
								The system includes keyword search and filtered calendar states.
							</p>
						</div>
					</StickyTrigger>

					<div className='md:flex-1 flex self-stretch items-center'>
						<StickyItem id='c'>
							<WithTilt>
								<Image
									src='/projects/cx3/calendar-collage-3.jpg'
									alt='Hero image of Justin McKee'
									width='1920'
									height='1343'
								/>
							</WithTilt>
						</StickyItem>
					</div>
				</div>

				<div className='flex flex-col md:flex-row gap-24 h-[66vh] items-center'>
					<StickyTrigger
						forStickyItem='#d'
						start='top bottom'>
						<div className='md:flex-1'>
							<p>
								<strong>Routing & user flows that convert</strong>
							</p>
							<p>
								SEO-friendly category routes and structured single-event detail
								pages centralize registration and ticketing flow within a
								scalable routing model.
							</p>
						</div>
					</StickyTrigger>

					<div className='md:flex-1 flex self-stretch items-center'>
						<StickyItem id='d'>
							<WithTilt
								rotateAmplitude={5}
								scaleOnHover={1}>
								<ImageStack
									layout='right'
									withTilt={true}
									images={[
										{
											src: '/projects/cx3/event-bottom-2.jpg',
											width: '1920',
											height: '1343',
											alt: '',
										},
										{
											src: '/projects/cx3/event-top-2.jpg',
											width: '1920',
											height: '1343',
											alt: '',
										},
									]}
								/>
							</WithTilt>
						</StickyItem>
					</div>
				</div>

				{/* <div className='flex flex-col md:flex-row gap-24 h-[66vh] items-center'>
					<StickyTrigger
						forStickyItem='#b2'
						start='top bottom'>
						<div className='md:flex-1'>
							<div>
								<p>
									SEO-friendly category routes and structured single-event
									detail pages centralize registration and ticketing flow within
									a scalable routing model.
								</p>
							</div>
						</div>
					</StickyTrigger>

					<div className='md:flex-1 flex self-stretch items-center'>
						<StickyItem id='b2'>
							<WithTilt className=''>
								<Image
									src='/projects/cx3/events-calendar.jpg'
									alt='Hero image of Justin McKee'
									width='3200'
									height='1915'
								/>
							</WithTilt>
						</StickyItem>
					</div>
				</div> */}

				<div className='flex flex-col md:flex-row gap-24 h-[66vh] items-center'>
					<StickyTrigger
						forStickyItem='#e'
						start='top bottom'>
						<div className='md:flex-1'>
							<h2 className='fluid-font'>
								Ticket Discovery & Registration Flow
							</h2>
							<p>
								I designed a structured ticket discovery experience that clearly
								communicates categories, inclusions, and pricing tiers while
								reducing ambiguity in the purchasing process. The registration
								flow culminates in a checkout handoff to an external payment
								provider.
							</p>
						</div>
					</StickyTrigger>

					<div className='md:flex-1 flex self-stretch items-center'>
						<StickyItem id='e'>
							<Image
								src='/projects/cx3/ticketing-inclusive.jpg'
								alt='Hero image of Justin McKee'
								width='1920'
								height='1343'
							/>
						</StickyItem>
					</div>
				</div>
			</WithSticky>

			<div className='flex flex-col md:flex-row gap-24 py-24 items-center'>
				<div className='md:flex-1'>
					<h2 className='fluid-font'>
						Ship What Matters. Fix What’s Slowing You Down.
					</h2>
					<p>
						You don’t need “another frontend developer.” - You need someone who
						can step into complexity and move the product forward.
					</p>
					<p>
						I help teams ship usable, high-performance interfaces, scale and
						stabilize growing codebases, and turn messy requirements into clean,
						shipped features.
					</p>
				</div>

				<div className='md:flex-1'>
					<Link
						href='#'
						className='block p-12 text-2xl'>
						Explore Projects
					</Link>
					<Link
						href='#'
						className='block p-12 text-2xl'>
						Schedule a chat
					</Link>
					<Link
						href='#'
						className='block w-full p-12 text-2xl'>
						Have a Question?
					</Link>
				</div>
			</div>
		</>
	);
}
