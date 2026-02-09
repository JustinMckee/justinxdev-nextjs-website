import { ImageProps } from 'next/image';
import styles from './index.module.scss';
import { Quote } from 'lucide-react';
import { ImageStack } from '../ImageStack';

export const QuoteBlock = ({
	layout = 'left',
	quote,
	attribution,
	images,
}: QuoteBlockProps) => {
	return (
		<div
			className={`flex w-full items-center gap-12 py-12 ${layout === 'left' ? 'flex-col lg:flex-row' : ''} ${layout === 'right' ? 'flex-col-reverse lg:flex-row-reverse' : ''} ${layout === 'center' ? 'flex-col' : ''}`}>
			<div className='w-full lg:w-[50%]'>
				<figure>
					<Quote size='2em' />
					<blockquote
						className={`text-xl md:text-3xl lg:text-[2vw] xl:text-4xl ${styles.blockquote}`}>
						<p className='h3 fluid-font'>{quote}</p>
					</blockquote>
					{attribution?.source && (
						<figcaption>
							— <cite>{attribution?.source}</cite>
						</figcaption>
					)}
				</figure>
			</div>
			{images && (
				<div
					className={`w-full lg:w-[50%] my-12 md:my-24  ${layout === 'center' ? 'lg:my-24' : 'lg:my-0'}`}>
					<ImageStack
						layout={layout === 'left' ? 'right' : 'left'}
						images={images}
					/>
				</div>
			)}
		</div>
	);
};

type QuoteBlockProps = {
	quote: string;
	attribution?: {
		source: string;
	};
	images?: ImageProps[];
	layout?: 'left' | 'center' | 'right';
};
