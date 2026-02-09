import { ImageProps } from 'next/image';
import styles from './index.module.scss';
import { Quote } from 'lucide-react';
import { ImageStack } from '../ImageStack';

export const QuoteBlock = ({ quote, attribution, images }: QuoteBlockProps) => {
	return (
		<div className='flex w-full flex-col lg:flex-row items-center'>
			<div className='w-full lg:w-[50%]'>
				<figure>
					<Quote size='2em' />
					<blockquote
						className={`text-xl md:text-3xl lg:text-[2vw] xl:text-4xl ${styles.blockquote}`}>
						<p>{quote}</p>
					</blockquote>
					{attribution?.source && (
						<figcaption>
							— <cite>{attribution?.source}</cite>
						</figcaption>
					)}
				</figure>
			</div>
			<div className='w-full lg:w-[50%]'>
				<ImageStack images={images} />
			</div>
		</div>
	);
};

type QuoteBlockProps = {
	quote: string;
	attribution?: {
		source: string;
	};
	images: ImageProps[];
};
