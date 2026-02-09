'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const BreadCrumbs = () => {
	const pathName = usePathname();
	const pathParts = pathName.slice(1).split('/');

	return (
		<nav aria-label='breadcrumb'>
			<ol className='inline-flex gap-2'>
				<li>
					<Link href='/'>Home</Link>
				</li>
				{pathParts.map((link, index) => {
					// Construct the full path up to the current segment
					const href = `/${pathParts.slice(0, index + 1).join('/')}`;
					// Capitalize the first letter of the segment for display
					const capitalizedLink = link[0]?.toUpperCase() + link.slice(1);
					// Check if it's the last item (current page, no link)
					const isLast = index === pathParts.length - 1;

					return (
						<li
							key={link}
							className='inline-flex gap-2'>
							<span> / </span> {/* Separator */}
							{isLast ? (
								<span className='text-gray-500'>{capitalizedLink}</span>
							) : (
								<Link
									href={href}
									className='hover:underline'>
									{capitalizedLink}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};
