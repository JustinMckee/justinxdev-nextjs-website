import Image, { ImageProps } from 'next/image';
import { ImageStack } from '../ImageStack';

export const TitleBlock = ({
	layout = 'left',
	heading,
	paragraph,
	imageProps,
}: TitleBlockProps) => {
	return (
		<div className={`grid grid-cols-8 md:grid-cols-16 py-24`}>
			<div className='col-start-1 col-span-7 flex flex-col justify-between'>
				<div>
					<h1>{heading}</h1>
				</div>
				{paragraph && (
					<div>
						<p>{paragraph}</p>
					</div>
				)}
			</div>
			<div className='col-start-1 md:col-start-9 h-full col-span-8 bg-gradient-to-br from-blue-600 to-cyan-400 md:relative aspect-square p-6'>
				<ImageStack
					layout={layout === 'left' ? 'right' : 'left'}
					images={imageProps}
				/>
			</div>
		</div>
	);
};

type TitleBlockProps = {
	layout?: 'left' | 'right';
	heading: string;
	paragraph?: string;
	imageProps: ImageProps[];
};
