import Link from 'next/link';
import styles from './header.module.scss';
export const Header = () => {
	return (
		<header
			className={`${styles['blurred-pseudo-bg']} w-full fixed top-0 left-0 z-50 backdrop-blur-md shadow-md px-2`}>
			<nav className='max-w-9xl mx-auto py-4 grid grid-cols-16 grid-rows-1'>
				<div className='col-span-4 col-start-1'>
					<Link
						href='/'
						className={`font-bold text-xl ${styles.logoGradient}`}>
						justin
						<span
							className={`relative top-1 text-[1.3em] px-[0.5px] ${styles.logoDivider}`}>
							&times;
						</span>
						dev
					</Link>
				</div>
				{/* <div className='hidden md:block col-span-5 col-start-6'>
					<div className='ml-10 flex items-baseline space-x-4'>
						<a
							href='#about'
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
							About
						</a>
						<a
							href='#skills'
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
							Skills
						</a>
						<a
							href='#projects'
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
							Projects
						</a>
						<a
							href='#collage'
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
							Experience
						</a>
						<a
							href='#contact'
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
							Contact
						</a>
					</div>
				</div> */}
				<div className='col-start-12 col-end-17 flex justify-end'>
					<Link
						href='https://linkedin.com/in/justin-mckee'
						target='_blank'
						className={`px-3 py-2 rounded-md text-md font-medium ${styles.linkGradient}`}>
						LinkedIn
					</Link>
					<Link
						href='https://github.com/justinmckee'
						target='_blank'
						className={`px-3 py-2 rounded-md text-md font-medium ${styles.linkGradient}`}>
						GitHub
					</Link>
					<Link
						href='#contact'
						className={`bg-hatch px-4 py-2 rounded-md text-md font-medium ml-4 ${styles.ctaButton}`}>
						<span className={styles.ctaText}>Get in Touch</span>
					</Link>
				</div>
			</nav>
		</header>
	);
};
