'use client';
import { ReactNode } from 'react';
import type { SpringOptions } from 'motion/react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const springValues: SpringOptions = {
	damping: 30,
	stiffness: 100,
	mass: 2,
};

export const WithTilt = ({
	children,
	className,
	scaleOnHover = 1.05,
	rotateAmplitude = 7,
}: WithTiltProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useSpring(useMotionValue(0), springValues);
	const rotateY = useSpring(useMotionValue(0), springValues);
	const scale = useSpring(1, springValues);

	const [lastY, setLastY] = useState(0);

	const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;

		const rect = ref.current.getBoundingClientRect();
		const offsetX = e.clientX - rect.left - rect.width / 2;
		const offsetY = e.clientY - rect.top - rect.height / 2;

		const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
		const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

		rotateX.set(rotationX);
		rotateY.set(rotationY);

		x.set(e.clientX - rect.left);
		y.set(e.clientY - rect.top);

		setLastY(offsetY);
	};

	const handleMouseEnter = () => {
		scale.set(scaleOnHover);
	};

	const handleMouseLeave = () => {
		scale.set(1);
		rotateX.set(0);
		rotateY.set(0);
	};

	return (
		<div
			ref={ref}
			className={`${className ? className : ''} relative w-full h-full [perspective:800px]`}
			onMouseMove={handleMouse}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<motion.div
				className='relative [transform-style:preserve-3d] will-change-transform'
				style={{
					rotateX,
					rotateY,
					scale,
				}}>
				{children}
			</motion.div>
		</div>
	);
};

type WithTiltProps = {
	className?: string;
	children: ReactNode;
	rotateAmplitude?: number;
	scaleOnHover?: number;
};
