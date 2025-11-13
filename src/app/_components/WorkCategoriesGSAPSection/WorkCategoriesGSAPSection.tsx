'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WorkCategoriesGSAPSection() {
	useGSAP(() => {
		setupPinnedAnimations();
	}, []);
	return (
		<section
			id={`${styles['work-categories']}`}
			className='max-w-9xl min-h-screen items-center gsap-pinned-section'>
			<div
				className={`${styles['col-1']} gsap-categories__data-binding__inputs`}>
				<h2 className='text-2xl mb-8'>
					Unify your brand + empower your data + accelerate your growth.
				</h2>
				<ul>
					<li className='gsap-category mb-8'>
						<h2
							className={`${styles['gsap-category__heading']} text-4xl font-bold mb-2`}
							data-bind-input='component-libraries'>
							<span className={`${styles['gsap-heading-subject']}`}>
								Component Libraries
							</span>{' '}
							<span className={`${styles['gsap-heading-modifier']}`}>
								crafted for brand consistency.
							</span>
						</h2>
						<p className='gsap-category__paragraph text-2xl'>
							Streamline your development process with cohesive design systems
							and reusable component libraries that ensure consistency and
							efficiency across your projects.
						</p>
					</li>
					<li className='gsap-category mb-8'>
						<h2
							className={`${styles['gsap-category__heading']} text-4xl font-bold mb-2`}
							data-bind-input='web-applications'>
							<span className={`${styles['gsap-heading-subject']}`}>
								Web Applications
							</span>{' '}
							<span className={`${styles['gsap-heading-modifier']}`}>
								engineered for intelligent workflows.
							</span>
						</h2>
						<p className='gsap-category__paragraph text-2xl'>
							Build dynamic web applications that support complex tasks,
							interactions, and user flows. Deliver them seamlessy across all
							browsers and devices.
						</p>
					</li>
					<li className='gsap-category mb-8'>
						<h2
							className={`${styles['gsap-category__heading']} text-4xl font-bold mb-2`}
							data-bind-input='websites'>
							<span className={`${styles['gsap-heading-subject']}`}>
								Websites, CMS, and eCommerce
							</span>{' '}
							<span className={`${styles['gsap-heading-modifier']}`}>
								architected for discovery.
							</span>
						</h2>
						<p className='gsap-category__paragraph text-2xl'>
							Build websites that guides search engines, shape perception, and
							expand your brand’s digital reach.
						</p>
					</li>
				</ul>
			</div>
			<div
				className={`${styles['col-2']} gsap-categories__data-binding__outputs ${styles['media-stacks-wrapper']}`}>
				<div
					className={`${styles['media-stack']}`}
					data-bind-output='component-libraries'>
					<div className={`${styles['media-top']}`}>
						<div className={`${styles['media-wrapper']}`}>
							<Image
								src='/hh-etb-01-new-dark.webp'
								alt='Component Libraries'
								width={1200}
								height={1012}
								className='w-full h-auto'
							/>
						</div>
					</div>
					<div className={`${styles['media-bottom']}`}>
						<div className={`${styles['media-wrapper']}`}>
							<Image
								src='/hh-etb-02-new-dark.png'
								alt='Component Libraries'
								width={1800}
								height={1500}
								className='w-full h-auto'
							/>
						</div>
					</div>
				</div>
				<div
					className={`${styles['media-stack']}`}
					data-bind-output='web-applications'>
					<div className={`${styles['media-top']}`}>
						<div className={`${styles['media-wrapper']}`}>
							<Image
								src='/hh-ecom-1-new-dark-1.png'
								alt='Web Applications'
								width={1800}
								height={1587}
								className='w-full h-auto'
							/>
						</div>
					</div>
					<div className={`${styles['media-bottom']}`}>
						<div className={`${styles['media-wrapper']}`}>
							<Image
								src='/hh-ecom-2-new-1.webp'
								alt='Component Libraries'
								width={1800}
								height={1587}
								className='w-full h-auto'
							/>
						</div>
					</div>
				</div>
				<div
					className={`${styles['media-stack']}`}
					data-bind-output='websites'>
					<div className={`${styles['media-top']}`}>
						<div className={`${styles['media-wrapper']}`}>
							<Image
								src='/hh-cms-new-1.webp'
								alt='Websites'
								width={1080}
								height={864}
								className='w-full h-auto'
							/>
						</div>
					</div>
					<div className={`${styles['media-bottom']}`}></div>
				</div>
			</div>
		</section>
	);
}

const pinSection = () => {
	// Select all elements with the class `.gsap-pinned-section`
	const pinnedSection = document.querySelector('.gsap-pinned-section');

	// Loop through each element and apply ScrollTrigger

	return gsap.timeline({
		scrollTrigger: {
			trigger: pinnedSection,
			pin: true,
			start: 'center center',
			end: '+=400%',
			scrub: true,
			// once: true,
			markers: true,
			pinSpacing: true,
		},
	});
};

const setupPinnedAnimations = () => {
	const pinnedSectionMasterTimeline = pinSection();

	const categories = document.querySelectorAll('.gsap-category');

	categories.forEach((category, index) => {
		const singleCategoryTimeline = gsap.timeline();
		const heading = category.querySelector(
			`.${styles['gsap-category__heading']}`
		);
		const headingModifier = category.querySelector(
			`.${styles['gsap-heading-modifier']}`
		);
		const paragraph = category.querySelector('.gsap-category__paragraph');
		const paragraphHeight = paragraph?.clientHeight || 0;
		const dataBindInput = heading?.getAttribute('data-bind-input');
		const outputSection = document.querySelector(
			`.gsap-categories__data-binding__outputs > div[data-bind-output='${dataBindInput}']`
		);
		const topImage = outputSection?.querySelector(`.${styles['media-top']}`);
		const bottomImage = outputSection?.querySelector(
			`.${styles['media-bottom']}`
		);

		//gsap.set(outputSection, { opacity: 0 });
		if (topImage) gsap.set(topImage, { opacity: 0 });
		if (bottomImage) gsap.set(bottomImage, { opacity: 0 });
		gsap.set(paragraph, { opacity: 0, y: 20, height: '0px' });
		gsap.set(heading, { opacity: 0.1 });

		// .to(paragraph, { height: `${paragraphHeight}px`, duration: 0.5 }, '<')
		// .to(paragraph, {
		// 	opacity: 1,
		// 	y: 0,
		// 	duration: 2.5,
		// 	ease: 'power2.out',
		// });

		// Animate heading to full opacity
		singleCategoryTimeline
			.to(heading, {
				opacity: 1,
				duration: 10,
				ease: 'power4.inOut',
			})
			.to(
				headingModifier,
				{
					backgroundPosition: '0% 0',
					duration: 15,
					ease: 'power4.inOut',
				},
				'<'
			);

		// Show corresponding output section
		if (topImage) {
			const topImageTimeline = gsap.timeline();
			topImageTimeline
				.fromTo(
					topImage,
					{
						opacity: 0,
						transform: 'translateY(40%)',
					},
					{
						opacity: 1,

						transform: 'translateY(20%)',
						ease: 'none',
						duration: 10,
					}
				)
				.fromTo(
					topImage,
					{
						transform: 'translateY(20%)',
					},
					{
						transform: 'translateY(-20%)',
						ease: 'none',
						duration: 20,
					}
				)
				.fromTo(
					topImage,
					{ transform: 'translateY(-20%)' },
					{
						opacity: 0,

						transform: 'translateY(-40%)',
						// ease: 'power4.in',
						ease: 'none',
						duration: 10,
					}
				);
			singleCategoryTimeline.add(topImageTimeline, '<');
		}

		if (bottomImage) {
			const bottomImageTimeline = gsap.timeline();
			bottomImageTimeline
				.fromTo(
					bottomImage,
					{
						opacity: 0,
						transform: 'translateY(10%)',
					},
					{
						opacity: 0.5,
						duration: 6.19,
						transform: 'translateY(5%)',
						ease: 'none',
						// ease: CustomEase.create(
						// 	'custom',
						// 	'M0,0 C0,0.406 0.299,0.414 0.504,0.512 0.737,0.623 1,0.602 1,1.012 '
						// ),
					}
				)
				.fromTo(
					bottomImage,
					{
						transform: 'translateY(5%)',
					},
					{
						duration: 14.8,
						transform: 'translateY(-5%)',
						ease: 'none',
					}
				)
				.fromTo(
					bottomImage,
					{ transform: 'translateY(-5%)' },
					{
						opacity: 0,
						duration: 6,
						transform: 'translateY(-10%)',
						ease: 'none',
					}
				);
			singleCategoryTimeline.add(bottomImageTimeline, '-=33');
			// .to(
			// 	bottomImage,
			// 	{
			// 		opacity: 1,
			// 		duration: 10,
			// 		transform: 'translate(0, 0)',
			// 		ease: 'power2.in',
			// 	},
			// 	'<-=10'
			// )
			// .to(bottomImage, {
			// 	opacity: 0,
			// 	duration: 10,
			// 	transform: 'translate(-40px, -40px)',
			// 	ease: 'power2.out',
			// },'<-=10');
		}
		pinnedSectionMasterTimeline.add(singleCategoryTimeline);
		// .to({}, { duration: 5 });
		// categoriesMasterTimeline.add(singleCategoryTimeline);
		// Hold the current state for 1.5 seconds
		// categoriesMasterTimeline.to({}, { duration: 1.5 });
	});

	//pinnedSectionMasterTimeline.to({});
};

// const setupStartingElementStates = () => {
// 	gsap.set('.gsap-categories__data-binding__outputs > div', { opacity: 0 });
// 	gsap.set('.gsap-category__paragraph', { opacity: 0, y: 20, height: '0' });
// 	gsap.set('.gsap-category__heading', { opacity: 0.5 });
// };
