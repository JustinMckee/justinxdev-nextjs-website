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

	if (!stickyTriggers) return;

	const triggers = Array.from(stickyTriggers);
	// let prevRange = 0;

	stickyTriggers?.forEach((trigger, index) => {
		const item = trigger.querySelector(`.${styles.item}`) as HTMLElement | null;
		if (!item) return;

		const startOffset = parseFloat(
			trigger.getAttribute('data-start-offset') || '0',
		);

		let startPosition: string;
		if (startOffset === 0) {
			startPosition = 'top center';
		} else if (startOffset > 0) {
			startPosition = `top center-=${Math.abs(startOffset)}%`;
		} else {
			startPosition = `top center+=${Math.abs(startOffset)}%`;
		}

		const triggerHeight = (trigger as HTMLElement).offsetHeight;
		const itemHeight = item.offsetHeight;
		const itemYOffsetPx =
			startOffset !== 0
				? -(Math.abs(startOffset) / 100) * triggerHeight - itemHeight / 2
				: 0;

		const nextTrigger = triggers[index + 1];
		const isLast = index === triggers.length - 1;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: trigger,
				pin: item,
				start: startPosition,
				endTrigger: !isLast ? nextTrigger : undefined,
				end: isLast ? `bottom center-=${triggerHeight}` : startPosition,
				scrub: true,
				pinSpacing: false,
				markers: true,
			},
		});

		// const st = tl.scrollTrigger;
		// if (st) {
		// 	prevRange = st.end - st.start;
		// }

		tl.fromTo(
			item,
			{
				opacity: 0,
				y: itemYOffsetPx,
				x: '100px',
			},
			{
				opacity: 1,
				y: itemYOffsetPx,
				x: '0px',
				duration: 0.2,
				ease: 'power2.out',
			},
		)
			.to(item, {
				y: itemYOffsetPx,
				duration: 0.6,
				opacity: 1,
			})
			.to(item, {
				opacity: 0,
				y: itemYOffsetPx,
				duration: 0.2,
				ease: 'power2.in',
			});
	});
}
