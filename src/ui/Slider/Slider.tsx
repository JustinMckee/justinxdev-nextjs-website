'use client';
import Image from 'next/image';
import styles from './Slider.module.scss';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { RefObject, UIEvent, useRef } from 'react';
import { debounce } from '@/app/lib/utils';

gsap.registerPlugin(useGSAP);

export const Slider = (props: Props) => {
	const lastScrollPositionRef = useRef<number>(0);

	// useGSAP(() => {
	// 	setupScrollVelocityAnimation();
	// }, []);

	return (
		<div
			className={`${styles['slider']} py-10 flex flex-col content-center overflow-x-scroll`}
			onScroll={(e: UIEvent) => {
				animateScrollVelocity(
					e.currentTarget.scrollLeft,
					lastScrollPositionRef
				);
			}}>
			<div className='max-w-9xl w-full self-center flex'>
				{props.data.map((item, index) => (
					<div
						key={index}
						className='flex-[1_0_50%] slide'>
						<a
							href={item.linkUrl}
							className='block flex-[1_1_] m-4 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
							<div className='w-full h-full bg-gray-200'>
								<Image
									alt={item.title}
									src={item.image.url}
									className='w-full aspect-3/2 object-cover transform hover:scale-105 transition-transform duration-300'
									width={item.image.width}
									height={item.image.height}
								/>
							</div>
							<div className='p-4 bg-white'>
								<h3 className='text-lg font-semibold text-gray-800'>
									{item.title}
								</h3>
							</div>
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

const setupScrollVelocityAnimation = (delta: number | string) => {
	const masterTimeline = gsap.timeline({ paused: true, yoyo: true, repeat: 1 });
	const slides = document.querySelectorAll('.slide');
	slides.forEach((slide) => {
		const slideTimeline = gsap.timeline();
		slideTimeline.fromTo(
			slide,
			{
				transform: `perspective(2000px) rotateY(0deg)`,
			},
			{
				transform: `perspective(2000px) rotateY(${delta}deg)`,
				duration: 0.5,
				ease: 'sine.out',
			}
		);
		masterTimeline.add(slideTimeline, 0);
	});
	masterTimeline.play();
};

const getScrollVelocityDelta = (
	scrollDistance: number,
	lastPositionRef: RefObject<number>
): number | string => {
	const scrollDelta = scrollDistance - lastPositionRef.current;
	let direction = '';
	if (lastPositionRef.current < scrollDistance) {
		direction = 'right';
	} else if (lastPositionRef.current > scrollDistance) {
		direction = 'left';
	}
	lastPositionRef.current = scrollDistance;
	const result = `Distance: ${scrollDistance} Delta: ${scrollDelta} Position: ${lastPositionRef.current} Direction: ${direction}`;
	console.log(result);

	return restrictRotation(scrollDelta, 15);
};

const animateScrollVelocity = debounce(
	(scrollDistance: number, lastPositionRef: RefObject<number>) => {
		setupScrollVelocityAnimation(
			getScrollVelocityDelta(scrollDistance, lastPositionRef)
		);
	},
	100,
	true // Enable leading edge execution
);

const restrictRotation = (delta: number, maxDegrees: number): number => {
	if (delta > maxDegrees) {
		return maxDegrees;
	} else if (delta < -maxDegrees) {
		return -maxDegrees;
	}

	return delta;
};

type Props = {
	data: Array<SliderItem>;
};

type SliderItem = {
	title: string;
	image: {
		url: string;
		width: number;
		height: number;
		alt: string;
	};
	linkUrl: string;
};

export const seedSliderData: Array<SliderItem> = [
	{
		title: 'Bridge',
		image: {
			url: '/seed/slider/bridge.jpg',
			width: 1280,
			height: 960,
			alt: 'Bridge',
		},
		linkUrl: '/projects/bridge',
	},
	{
		title: 'Hallway',
		image: {
			url: '/seed/slider/hallway.jpg',
			width: 1279,
			height: 854,
			alt: 'Hallway',
		},
		linkUrl: '/projects/hallway',
	},
	{
		title: 'Home',
		image: {
			url: '/seed/slider/home.jpg',
			width: 1280,
			height: 1280,
			alt: 'Home',
		},
		linkUrl: '/projects/home',
	},
	{
		title: 'Open Space',
		image: {
			url: '/seed/slider/open-space.jpg',
			width: 1280,
			height: 800,
			alt: 'Open Space',
		},
		linkUrl: '/projects/open-space',
	},
	{
		title: 'Second Story',
		image: {
			url: '/seed/slider/second-story.jpg',
			width: 1280,
			height: 853,
			alt: 'Second Story',
		},
		linkUrl: '/projects/second-story',
	},
	{
		title: 'Structural Supports',
		image: {
			url: '/seed/slider/supports.jpg',
			width: 1280,
			height: 853,
			alt: 'Structural Supports',
		},
		linkUrl: '/projects/structural-supports',
	},
];
