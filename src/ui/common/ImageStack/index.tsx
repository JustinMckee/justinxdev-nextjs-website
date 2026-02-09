import Image, { ImageProps } from 'next/image';
import styles from './index.module.scss';

export const ImageStack = ({ layout = 'left', images }: ImageStackProps) => (
	<div className={`${styles['media-stack']} ${styles[layout]}`}>
		{images.slice(0, 2).map((image, idx) => (
			<div
				key={idx + image.src.toString()}
				className={`${styles[`media-${idx ? 'bottom' : 'top'}`]}`}>
				<div className={`${styles['media-wrapper']}`}>
					{images[0] && (
						<Image
							{...image}
							alt={image.alt}
							className='w-full h-auto'
						/>
					)}
				</div>
			</div>
		))}
	</div>
);

type ImageStackProps = {
	layout?: 'left' | 'right';
	images: ImageProps[];
};
