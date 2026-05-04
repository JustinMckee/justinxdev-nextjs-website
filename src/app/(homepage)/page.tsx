import { useRef } from 'react';
import HeroHeadlineGSAPTyping from '@/app/_components/HeroHeadlineGSAPTyping';
import HeadlineGSAPFollowMouse from '@/app/_components/HeadlineGSAPFollowMouse';
import WorkCategoriesGSAPSection from '@/app/_components/WorkCategoriesGSAPSection/WorkCategoriesGSAPSection';
import LogoGrid from '@/app/_components/LogoGrid';
import Image from 'next/image';
import styles from './page.module.scss';
import { SlideDeck } from '../../ui/SlideDeck/SlideDeck';
import { ImageStack } from '@/ui/common/ImageStack';
import { MottoTaglineSection } from '../_components/MottoTaglineSection/MottoTaglineSection';
import Link from 'next/link';
import { X, XIcon } from 'lucide-react';

export default function Home() {
	return (
		<>
			{/* <article className='flex flex-col w-full items-center justify-center'> */}
			<section
				id='hero'
				className={`${styles.hero} site-section`}>
				<div className='relative py-4 pt-24 z-10 max-w-9xl flex w-full flex-col lg:flex-row min-h-[66vh] items-center'>
					<div className='w-full lg:w-[50%] pt-24 flex flex-col justify-center'>
						<h1 className='text-[8vw] md:text-[7vw] font-bold leading-tight lg:text-[4vw] xl:text-6xl mb-4'>
							<HeroHeadlineGSAPTyping />
						</h1>
						<p className='bg-stipple text-xl guide-lines md:text-3xl lg:text-[2vw] xl:text-4xl p-[0.5rem]'>
							A technical product manager and frontend engineer passionate about
							strategic UX and high-impact UI that actually moves the needle.
						</p>
					</div>
					<div className='w-full lg:w-[50%] pt-12 pb-24'>
						<ImageStack
							withTilt={true}
							layout='right'
							images={[
								{
									src: '/hero-top.webp',
									alt: 'Hero image of Justin McKee',
									width: 3200,
									height: 1915,
								},
								{
									src: '/hero-bottom.webp',
									alt: 'Hero image of Justin McKee',
									width: 3200,
									height: 1973,
								},
							]}
						/>
					</div>
				</div>
			</section>
			<section
				id='about'
				className='site-section max-w-9xl w-full flex-col pb-10 xl:pb-35 z-[5]'>
				<div className='w-full max-w-5xl mx-auto'>
					<p className=' text-lg md:text-xl xl:text-3xl text-center p-[0.5rem]'>
						I craft immersive user experiences, dashboards, eCommerce
						storefronts, and more.
						<br />I do it with a modern tech stack.
					</p>
					<LogoGrid />
				</div>
			</section>
			<section className='site-section guide-lines max-w-8xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-12 xl:gap-24 py-24 items-start'>
				<div className='bg-hatch h-[100%] mt-[-0.5rem] p-[1rem]'>
					<h2
						className={`text-5xl md:fluid-font xl:text-6xl md:h1 mb-[0.5rem] ${styles['font-gradient']}`}>
						Ship
						<br />
						what
						<br />
						matters.
					</h2>
					{/* <span className='block text-3xl md:text-xl xl:text-2xl'>
						& Fix What’s Slowing You Down.
					</span> */}
				</div>

				<div>
					<p className='text-xl text-justify hyphens-auto'>
						I've spent over a decade helping teams build better products by
						standardizing frontend patterns and driving alignment between
						technical execution and product goals. I enable teams to ship high
						performance interfaces, scale and stabilize growing codebases, and
						turn messy requirements into clean, shipped features.
					</p>
				</div>

				<div>
					<Link
						aria-disabled='true'
						href='#'
						tabIndex={-1}
						// onClick={(event) => event.preventDefault()}
						className={`p-8 text-2xl w-full bg-hatch my-2 ${styles.ctaButton} ${styles.ctaButtonDisabled}`}>
						<s className='relative'>
							<span className={styles.ctaText}>Explore Projects</span>
							<span className='absolute bottom-[-15px] left-0 text-sm'>
								Coming Soon
							</span>
						</s>{' '}
						<span
							className={styles.ctaX}
							aria-hidden='true'
						/>
					</Link>
					<Link
						href='#'
						className={`p-8 text-2xl w-full bg-hatch my-2 ${styles.ctaButton}`}>
						<span className={styles.ctaText}>Get in Touch</span>
						<span
							className={styles.ctaArrow}
							aria-hidden='true'
						/>
					</Link>
				</div>
			</section>

			<MottoTaglineSection />
			<WorkCategoriesGSAPSection />
			{/* <section
				id='project-stack'
				className='w-full min-h-screen flex-col py-35'>
				<div className='w-full max-w-9xl mx-auto'>
					<h2 className='text-5xl font-bold mb-8 leading-tight'>
						Recent Projects
					</h2>
					<p className='text-3xl text-center mb-16'>
						Some of the projects I've worked on recently.
					</p>
					<SlideDeck />
				</div>
			</section> */}
			{/* <section
				id='projects'
				className='w-full min-h-screen py-35'>
				<div className='w-full max-w-9xl mx-auto'>
					<h2 className='text-5xl font-bold mb-8 leading-tight'>
						Recent Projects
					</h2>
					<p className='text-3xl text-center mb-16'>
						Some of the projects I've worked on recently.
					</p>
				</div>
				<Slider data={seedSliderData} />
			</section> */}
			{/* // </article> */}
		</>
	);
}
