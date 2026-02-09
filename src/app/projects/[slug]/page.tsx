import { QuoteBlock } from '@/ui/common/QuoteBlock';
import { TitleBlock } from '@/ui/common/TitleBlock';
import { ImageStack } from '@/ui/common/ImageStack';
import {
	WithSticky,
	StickyItem,
	StickyTrigger,
} from '@/ui/features/WithSticky';
import Image from 'next/image';

export default function Page() {
	return (
		<>
			{/* <h1 className='fluid-font'>
				The quick fox jumped over the lazy brown dog.
			</h1>
			<h2 className='fluid-font'>
				The quick fox jumped over the lazy brown dog.
			</h2>
			<h3 className='fluid-font'>
				The quick fox jumped over the lazy brown dog.
			</h3>
			<h4 className='fluid-font'>
				The quick fox jumped over the lazy brown dog.
			</h4>
			<h5 className='fluid-font'>
				The quick fox jumped over the lazy brown dog.
			</h5>
			<h6 className='fluid-font'>
				The quick fox jumped over the lazy brown dog.
			</h6>
			<p className='fluid-font'>
				The quick fox jumped over the lazy brown dog.
			</p> */}
			<TitleBlock
				heading='Lorem ipsum dolar sit amet.'
				paragraph='Vin dictus solari vultron de equalibrium. Sor vin doc dolar sin plubirus de arnemium. Tolari san divium delirious espi polaris doctyle.'
				imageProps={[
					{
						src: '/seed/slider/bridge.jpg',
						width: '1280',
						height: '960',
						alt: '',
					},
					{
						src: '/seed/slider/bridge.jpg',
						width: '1280',
						height: '960',
						alt: '',
					},
				]}
			/>
			<QuoteBlock
				layout='left'
				quote='Lorem ipsum dolar sit amet vin dictus solari alternus.'
				attribution={{ source: 'lorem ipsum' }}
				images={[
					{
						src: '/hero-top.webp',
						alt: 'Hero image of Justin McKee',
						width: '3200',
						height: '1915',
					},
					{
						src: '/hero-bottom.webp',
						alt: 'Hero image of Justin McKee',
						width: '3200',
						height: '1973',
					},
				]}
			/>
			<WithSticky>
				<div className='flex flex-col md:flex-row gap-24 h-[66vh] items-center'>
					<div className='md:flex-1'>
						<h2 className='fluid-font'>
							Lorem ipsum dolar sit amet vin dictus solairs.
						</h2>
						<p>
							Lorem ipsum dolar sit amet vin dictus solairs. Lorem ipsum dolar
							sit amet vin dictus solairs. Lorem ipsum dolar sit amet vin dictus
							solairs. Lorem ipsum dolar sit amet vin dictus solairs. Lorem
							ipsum dolar sit amet vin dictus solairs.
						</p>
					</div>

					<div className='md:flex-1 flex self-stretch items-center'>
						<StickyTrigger startOffset={3}>
							<StickyItem>
								<Image
									src='/hero-bottom.webp'
									alt='Hero image of Justin McKee'
									width='3200'
									height='1915'
								/>
							</StickyItem>
						</StickyTrigger>
					</div>
				</div>
				<div className='flex flex-col md:flex-row gap-24 h-[66vh] items-center'>
					<div className='md:flex-1'>
						<h2 className='fluid-font'>
							Lorem ipsum dolar sit amet vin dictus solairs.
						</h2>
						<p>
							Lorem ipsum dolar sit amet vin dictus solairs. Lorem ipsum dolar
							sit amet vin dictus solairs. Lorem ipsum dolar sit amet vin dictus
							solairs. Lorem ipsum dolar sit amet vin dictus solairs. Lorem
							ipsum dolar sit amet vin dictus solairs.
						</p>
					</div>

					<div className='md:flex-1 flex self-stretch items-center'>
						<StickyTrigger startOffset={3}>
							<StickyItem>
								<ImageStack
									layout='right'
									images={[
										{
											src: '/hero-top.webp',
											alt: 'Hero image of Justin McKee',
											width: '3200',
											height: '1915',
										},
										{
											src: '/hero-bottom.webp',
											alt: 'Hero image of Justin McKee',
											width: '3200',
											height: '1973',
										},
									]}
								/>
							</StickyItem>
						</StickyTrigger>
					</div>
				</div>
				<div className='flex flex-col md:flex-row gap-24 h-[66vh] items-center'>
					<div className='md:flex-1'>
						<h2 className='fluid-font'>
							Lorem ipsum dolar sit amet vin dictus solairs.
						</h2>
						<p>
							Lorem ipsum dolar sit amet vin dictus solairs. Lorem ipsum dolar
							sit amet vin dictus solairs. Lorem ipsum dolar sit amet vin dictus
							solairs. Lorem ipsum dolar sit amet vin dictus solairs. Lorem
							ipsum dolar sit amet vin dictus solairs.
						</p>
					</div>

					<div className='md:flex-1 flex self-stretch items-center'>
						<StickyTrigger startOffset={3}>
							<StickyItem>
								<Image
									src='/hero-bottom.webp'
									alt='Hero image of Justin McKee'
									width='3200'
									height='1973'
								/>
							</StickyItem>
						</StickyTrigger>
					</div>
				</div>
			</WithSticky>
			<div className='h-[100vh]'></div>
		</>
	);
}
