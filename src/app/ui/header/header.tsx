import styles from './header.module.scss';
export const Header = () => {
	return (
		<header
			className={`${styles['blurred-pseudo-bg']} w-full fixed top-0 left-0 z-50 backdrop-blur-md shadow-md px-2`}>
			<nav className='max-w-9xl mx-auto py-4 grid grid-cols-16 grid-rows-1'>
				<div className='col-span-4 col-start-1'>
					<a
						href='#hero'
						className='text-white font-bold text-xl'>
						justin
						<span className='opacity-50 relative top-1 text-[1.3em] px-[0.5px]'>
							&times;
						</span>
						dev
					</a>
				</div>
				<div className='hidden md:block col-span-5 col-start-6'>
					<div className='ml-10 flex items-baseline space-x-4'>
						<a
							href='#about'
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
							About
						</a>
						<a
							href='#collage'
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
							Work
						</a>
						<a
							href='#contact'
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
							Contact
						</a>
					</div>
				</div>
				<div className='col-span-3 col-start-14 flex justify-end'>
					<a
						href='linkedin.com/in/justin-mckee'
						className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
						LinkedIn
					</a>
					<a
						href='github.com/justinxdev'
						className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
						GitHub
					</a>
					<a
						href='#contact'
						className='bg-white text-black px-4 py-2 rounded-md text-sm font-medium ml-4 hover:bg-gray-200'>
						Get in Touch
					</a>
				</div>
			</nav>
		</header>
	);
};
