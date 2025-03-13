import NavBar from '@/components/NavBar';

export default function DasboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen'>
			<div className='flex w-64 flex-col gap-4 bg-gray-800 p-6 text-white'>
				<NavBar />
			</div>
			<div className='flex-1 bg-gray-900 p-6 text-white'>{children}</div>
		</div>
	);
}
