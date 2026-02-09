'use client';
import { ReactNode, ReactElement, HTMLAttributes, cloneElement } from 'react';
import styles from './index.module.scss';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type WithTriggerProps = WithStickyProps & {
	startOffset?: number;
	endOffset?: number;
};

type WithStickyProps = {
	children: ReactNode;
};

/**
 * @name WithSticky
 * @description A container component that initializes GSAP ScrollTrigger animations for nested StickyTrigger and StickyItem components.
 */
export const WithSticky = ({ children }: WithStickyProps) => {
	useGSAP(() => {
		// GSAP's replacement for useLayoutEffect - with built in cleanup of GSAP objects when unmounted.
		addStickyItemTimelines();
	}, []);
	return <div className={styles.wrapper}>{children}</div>;
};

/**
 * @name StickyTrigger
 * @description A wrapper component that defines a trigger element for when a children StickyItem should start/end being sticky.
 */
export const StickyTrigger = ({
	children,
	startOffset = 0,
	endOffset = 0,
}: WithTriggerProps) => {
	const child = children as ReactElement<HTMLAttributes<HTMLElement>>;
	console.log(startOffset);
	// Check if the child is a DOM element
	if (typeof child.type === 'string') {
		// It's a DOM element - clone and add className
		const existingClassName = child.props.className || '';
		return cloneElement(child, {
			className: `${existingClassName} ${styles.trigger}`.trim(),
			'data-start-offset': startOffset,
			'data-end-offset': endOffset,
		} as HTMLAttributes<HTMLElement>);
	}

	// It's a component or other - wrap it
	return (
		<div
			className={styles.trigger}
			data-start-offset={startOffset}
			data-end-offset={endOffset}>
			{children}
		</div>
	);
};

/**
 * @name StickyItem
 * @description A wrapper component that defines the sticky element. Must be wrapped by a StickyTrigger.
 */
export const StickyItem = ({ children }: WithStickyProps) => {
	const child = children as ReactElement<HTMLAttributes<HTMLElement>>;

	// Check if the child is a DOM element
	if (typeof child.type === 'string') {
		// It's a DOM element - clone and add className
		const existingClassName = child.props.className || '';
		return cloneElement(child, {
			className: `${existingClassName} ${styles.item}`.trim(),
		});
	}

	// It's a component or other - wrap it
	return <div className={styles.item}>{children}</div>;
};

function addStickyItemTimelines() {
	const stickyWrapper = document.querySelector(`.${styles.wrapper}`);
	const stickyTriggers = stickyWrapper?.querySelectorAll(`.${styles.trigger}`);

	stickyTriggers?.forEach((trigger, index) => {
		const item = trigger.querySelector(`.${styles.item}`);

		const startOffset = parseFloat(
			trigger.getAttribute('data-start-offset') || '0',
		);

		// Calculate start position relative to center (50%)
		// startOffset is in % relative to center
		// Negative = lower (triggers earlier), Positive = higher (triggers later)
		let startPosition: string;
		if (startOffset === 0) {
			startPosition = 'top center'; // Exactly at center
		} else if (startOffset > 0) {
			startPosition = `top center-=${Math.abs(startOffset)}%`; // Below center
		} else {
			startPosition = `top center+=${Math.abs(startOffset)}%`; // Above center
		}

		console.log('Start position:', startPosition, 'Offset:', startOffset);

		const viewportHeight = window.innerHeight;
		const itemHeight = (item as HTMLElement).offsetHeight;
		const itemYOffsetPx =
			startOffset !== 0
				? -(Math.abs(startOffset) / 100) * viewportHeight - itemHeight / 2 // Convert % to pixels and invert
				: 0;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: trigger,
				pin: item,
				start: startPosition,
				end: `bottom top`,
				scrub: true,
				pinSpacing: false,
				markers: true,
			},
		});

		// Fade-in and slide from right to left when element is pinned.
		tl.fromTo(
			item,
			{
				opacity: 0, // start at 0 opacity
				y: itemYOffsetPx,
				x: '100px', // start from the right of where element is painted in DOM
			},
			{
				opacity: 1, // Fade-in
				y: itemYOffsetPx,
				x: '0px', // end at the true location of where the element is painted in the DOM - This animates it from right to left
				duration: 0.2,
				ease: 'power2.out',
			},
		)
			// Hold in place (visible)
			.to(item, {
				y: itemYOffsetPx,
				duration: 0.6,
				opacity: 1,
			})
			// Fade out at end
			.to(item, {
				opacity: 0,
				y: itemYOffsetPx,
				duration: 0.2,
				ease: 'power2.in',
			});
	});
}
