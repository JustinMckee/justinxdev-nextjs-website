import Image, { ImageProps } from 'next/image';
import styles from './index.module.scss';
import { WithTilt } from '@/ui/features/WithTilt';

const ImageWrapper = ({
	image,
	idx,
	withTilt,
	className,
}: ImageWrapperProps) => {
	return (
		<>
			{withTilt && (
				<WithTilt
					className={`${styles[`media-${idx ? 'bottom' : 'top'}`]} ${className}`}>
					<div className={`${styles['media-wrapper']}`}>
						<Image
							{...image}
							alt={image.alt}
							className='w-full h-auto'
						/>
					</div>
				</WithTilt>
			)}
			{!withTilt && (
				<div
					className={`${styles[`media-${idx ? 'bottom' : 'top'}`]} ${className}`}>
					<div className={`${styles['media-wrapper']}`}>
						<Image
							{...image}
							alt={image.alt}
							className='w-full h-auto'
						/>
					</div>
				</div>
			)}
		</>
	);
};

export const ImageStack = ({
	layout = 'left',
	images,
	withTilt = false,
	className = '',
}: ImageStackProps) => (
	<div className={`${styles['media-stack']} ${styles[layout]}`}>
		{images.slice(0, 2).map((image, idx) => {
			return (
				<ImageWrapper
					key={idx + image.src.toString()}
					image={image}
					idx={idx}
					withTilt={withTilt}
					className={className}
				/>
			);
		})}
	</div>
);

type ImageStackProps = {
	layout?: 'left' | 'right';
	images: ImageProps[];
	withTilt?: boolean;
	className?: string;
};

type ImageWrapperProps = {
	image: ImageProps;
	idx: number;
	withTilt: boolean;
	className?: string;
};
