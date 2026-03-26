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

export default function Home() {
	return (
		<article className='flex flex-col w-full items-center justify-center'>
			<section
				id='hero'
				className={styles.hero}>
				<div className='relative z-10 max-w-9xl flex w-full flex-col lg:flex-row min-h-[66vh] items-center'>
					<div className='w-full lg:w-[50%]'>
						<h1 className='guide-lines text-3xl md:text-[7vw] font-bold leading-tight lg:text-[4vw] xl:text-6xl mb-4'>
							<HeroHeadlineGSAPTyping />
						</h1>
						<p className='guide-lines text-xl md:text-3xl lg:text-[2vw] xl:text-4xl'>
							A frontend engineer passionate about strategic UX and high-impact
							UI that actually move the needle.
						</p>
					</div>
					<div className='w-full lg:w-[50%]'>
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
				className='max-w-9xl w-full flex-col mb-25 pb-35 z-[5]'>
				<div className='w-full max-w-5xl mx-auto'>
					<p className='guide-lines text-3xl text-center'>
						I leverage the latest tech stacks to build immersive experiences,
						design systems, dashboards, and websites
					</p>
					<LogoGrid />
				</div>
			</section>
			<MottoTaglineSection />
			<WorkCategoriesGSAPSection />
			<section
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
			</section>
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
		</article>
	);
}
