import { BreadCrumbs } from '@/ui/common/Breadcrumbs';
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='w-full pt-24 max-w-9xl mx-auto'>
			<BreadCrumbs />
			{children}
		</div>
	);
}
