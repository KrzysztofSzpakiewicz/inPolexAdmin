'use client';
import React, { useEffect } from 'react';
import { FetchedPackages } from './dataTypes';
import Cookies from 'js-cookie';
import Package from './components/Package';
import Link from 'next/link';
const token: string = Cookies.get('authToken') || '';
export default function Packages(): React.JSX.Element {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const [packages, setPackages] = React.useState<FetchedPackages[]>([]);

	useEffect(() => {
		setIsLoading(true);
		fetch('/api/package?page=0&size=100', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res: Response) => res.json())
			.then((data: FetchedPackages[]) => setPackages(data))
			.finally(() => setIsLoading(false));
	}, []);

	console.log('Fetched packages:', packages);

	return (
		<div className='flex flex-col gap-4'>
			{isLoading && (
				<div className='bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black'>
					<div className='mt-4 flex justify-center'>
						<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
					</div>
				</div>
			)}
			<h2 className='font-montserrat text-light flex items-center text-xl font-bold'>
				Packages:
			</h2>

			<div className='grid grid-cols-4 gap-3'>
				{packages.map((pkg: FetchedPackages) => (
					<Link href={`/dashboard/packages/${pkg.id}`} key={pkg.id}>
						<Package data={pkg} />
					</Link>
				))}
			</div>
		</div>
	);
}
