'use client';
import { ReactNode, ReactElement, HTMLAttributes, cloneElement } from 'react';
import styles from './index.module.scss';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type WithTriggerProps = WithStickyProps & {
	triggerStartOffset?: number;
	triggerEndOffset?: number;
	forStickyItem?: `#${string}`;
	start?: string;
};

type WithStickyProps = {
	children: ReactNode;
	id?: string;
};

type StickyItemProps = WithStickyProps & {};

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
	triggerStartOffset = 0,
	triggerEndOffset = 0,
	forStickyItem,
	start,
	/*end*/
}: WithTriggerProps) => {
	const child = children as ReactElement<HTMLAttributes<HTMLElement>>;
	// Check if the child is a DOM element
	if (typeof child.type === 'string') {
		// It's a DOM element - clone and add className
		const existingClassName = child.props.className || '';
		return cloneElement(child, {
			className: `${existingClassName} ${styles.trigger}`.trim(),
			'data-start-offset': triggerStartOffset,
			'data-end-offset': triggerEndOffset,
			...(forStickyItem && { 'data-trigger-for': forStickyItem }),
			...(start && { 'data-start': start }),
			// ...(end && { 'data-end': end }),
		} as HTMLAttributes<HTMLElement>);
	}

	// It's a component or other - wrap it
	return (
		<div
			className={styles.trigger}
			data-start-offset={triggerStartOffset}
			data-end-offset={triggerEndOffset}
			data-trigger-for={forStickyItem}
			data-start={start ?? ''}>
			{children}
		</div>
	);
};

/**
 * @name StickyItem
 * @description A wrapper component that defines the sticky element. Must be wrapped by a StickyTrigger.
 */
export const StickyItem = ({ children, id = '' }: StickyItemProps) => {
	const child = children as ReactElement<HTMLAttributes<HTMLElement>>;

	// Check if the child is a DOM element
	if (typeof child.type === 'string') {
		// It's a DOM element - clone and add className
		const existingClassName = child.props.className || '';
		return cloneElement(child, {
			...child.props,
			id: id,
			className: `${existingClassName} ${styles.item}`.trim(),
		});
	}

	// It's a component or other - wrap it
	return (
		<div
			id={id}
			className={styles.item}>
			{children}
		</div>
	);
};

function addStickyItemTimelines() {
	const stickyWrapper = document.querySelector(`.${styles.wrapper}`);
	const stickyTriggers = stickyWrapper?.querySelectorAll(`.${styles.trigger}`);

	if (!stickyTriggers) return;

	const triggers = Array.from(stickyTriggers);
	// let prevRange = 0;

	stickyTriggers?.forEach((trigger, index) => {
		const forStickyItemId = trigger.getAttribute('data-trigger-for');
		const start = trigger.getAttribute('data-start');
		// @TODO const end = trigger.getAttribute('data-start');
		const item = (
			forStickyItemId
				? stickyWrapper?.querySelector(forStickyItemId)
				: trigger.querySelector(`.${styles.item}`)
		) as HTMLElement | null;
		if (!item) return;

		if (index === 0) {
			console.log(start, item);
		}

		const startOffset = parseFloat(
			trigger.getAttribute('data-start-offset') || '0',
		);

		let startPosition: string;
		if (start && !startOffset) {
			startPosition = start;
		} else if (startOffset === 0) {
			startPosition = 'top center';
		} else if (startOffset > 0) {
			startPosition = `top center-=${Math.abs(startOffset)}%`;
		} else {
			startPosition = `top center+=${Math.abs(startOffset)}%`;
		}

		const triggerHeight = (trigger as HTMLElement).offsetHeight;
		// const itemHeight = item.offsetHeight;
		// const itemYOffsetPx = -(window.innerHeight / 2 - itemHeight / 2);
		const setCenteredY = () => {
			const rect = item.getBoundingClientRect();
			const targetTop = (window.innerHeight - rect.height) / 2;
			const delta = targetTop - rect.top;
			gsap.set(item, { y: delta });
		};

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
				onRefreshInit: () => gsap.set(item, { y: 0 }),
				onRefresh: setCenteredY,
				onEnter: setCenteredY,
				onEnterBack: setCenteredY,
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
				x: '100px',
			},
			{
				opacity: 1,
				//y: stickyItemCenterY,
				x: '0px',
				duration: 0.2,
				ease: 'power2.out',
			},
		)
			.to(item, {
				//y: stickyItemCenterY,
				duration: 0.6,
				opacity: 1,
			})
			.to(item, {
				opacity: 0,
				//y: stickyItemCenterY,
				duration: 0.2,
				ease: 'power2.in',
			});
	});
}
