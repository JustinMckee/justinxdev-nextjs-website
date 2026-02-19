'use client';
import { useRef } from 'react';
import HeroHeadlineGSAPTyping from '@/app/_components/HeroHeadlineGSAPTyping';
import HeadlineGSAPFollowMouse from '@/app/_components/HeadlineGSAPFollowMouse';
import WorkCategoriesGSAPSection from '@/app/_components/WorkCategoriesGSAPSection/WorkCategoriesGSAPSection';
import LogoGrid from '@/app/_components/LogoGrid';
import Image from 'next/image';
import styles from './page.module.scss';
import { Slider, seedSliderData } from '../ui/Slider/Slider';
import { SlideDeck } from '../ui/SlideDeck/SlideDeck';
import { ImageStack } from '@/ui/common/ImageStack';
import GridDistortion from '@/ui/features/backgrounds/GridDistortion';

export default function Home() {
	const trackingRef = useRef<HTMLElement>(null);

	return (
		<article className='flex flex-col w-full items-center justify-center'>
			<section
				ref={trackingRef}
				id='hero'
				className={styles.hero}>
				<div className='relative z-10 max-w-9xl flex w-full flex-col lg:flex-row min-h-[66vh] items-center'>
					<div className='w-full lg:w-[50%]'>
						<h1 className='text-3xl md:text-[7vw] font-bold leading-tight lg:text-[4vw] xl:text-6xl mb-4'>
							<HeroHeadlineGSAPTyping />
						</h1>
						<p className='text-xl md:text-3xl lg:text-[2vw] xl:text-4xl'>
							A frontend engineer passionate about strategic UX and elevated UI
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
				<div className={styles.gridWrap}>
					<GridDistortion
						imageSrc='/backgrounds/relief-grid.jpg'
						grid={20}
						mouse={0.1}
						strength={0.15}
						relaxation={0.9}
						className={styles.background}
						mouseTrackingLayer={trackingRef}
					/>
				</div>
			</section>
			<section
				id='about'
				className='max-w-9xl w-full flex-col mb-25 py-35'>
				<div className='w-full max-w-5xl mx-auto'>
					<p className='text-3xl text-center'>
						I develop component systems, web applications, and websites using a
						modern tech stack.
					</p>
					<LogoGrid />
				</div>
			</section>
			<section
				id='collage'
				className='w-full flex-col py-35'>
				<div className='w-full max-w-5xl mx-auto mb-25'>
					<HeadlineGSAPFollowMouse />
					<p className='text-3xl text-center'>
						Engineering that hustles as hard as your brand.
					</p>
				</div>
				<Image
					src='/collage.webp'
					alt='Work collage'
					width={2880}
					height={1940}
					className='w-full h-auto'
				/>
			</section>
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
