import HeroHeadlineGSAPTyping from '@/app/_components/HeroHeadlineGSAPTyping';
import HeadlineGSAPFollowMouse from '@/app/_components/HeadlineGSAPFollowMouse';
import WorkCategoriesGSAPSection from '@/app/_components/WorkCategoriesGSAPSection/WorkCategoriesGSAPSection';
import LogoGrid from '@/app/_components/LogoGrid';
import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
	return (
		<article className='flex flex-col w-full items-center justify-center'>
			<section
				id='hero'
				className='max-w-9xl flex w-full flex-col lg:flex-row min-h-screen items-center'>
				<div className='w-full lg:w-[50%]'>
					<h1 className='text-3xl md:text-[7vw] font-bold leading-tight lg:text-[4vw] xl:text-6xl mb-4'>
						<HeroHeadlineGSAPTyping />
					</h1>
					<p className='text-xl md:text-3xl lg:text-[2vw] xl:text-4xl'>
						A frontend engineer passionate about strategic UX and elevated UI
					</p>
				</div>
				<div className='w-full lg:w-[50%]'>
					<div className={`${styles['media-stack']}`}>
						<div className={`${styles['media-top']}`}>
							<div className={`${styles['media-wrapper']}`}>
								<Image
									src='/hero-top.webp'
									alt='Hero image of Justin McKee'
									width={3200}
									height={1915}
									className='w-full h-auto'
								/>
							</div>
						</div>
						<div className={`${styles['media-bottom']}`}>
							<div className={`${styles['media-wrapper']}`}>
								<Image
									src='/hero-bottom.webp'
									alt='Hero image of Justin McKee'
									width={3200}
									height={1973}
									className='w-full h-auto'
								/>
							</div>
						</div>
					</div>
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
			<section className='min-h-screen'></section>
		</article>
	);
}
