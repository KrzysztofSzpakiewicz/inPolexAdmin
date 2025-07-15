'use client';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useParams, useRouter } from 'next/navigation';
import { FetchedPackages } from '../dataTypes';
import Image from 'next/image';
import PackageUsersDetails from './components/PackageUsersDetails';
import Link from 'next/link';
const token: string | undefined = Cookies.get('authToken');
export default function Package(): React.JSX.Element {
	const router: AppRouterInstance = useRouter();
	const { packageId } = useParams();
	const [packages, setPackages] = React.useState<FetchedPackages[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	useEffect(() => {
		setIsLoading(true);
		fetch(`/api/package?query=${packageId}&field=id&page=0&size=1`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res: Response) => res.json())
			.then((data: FetchedPackages[]) => setPackages(data))
			.finally(() => setIsLoading(false));
	}, [packageId]);

	return (
		<div className=''>
			{isLoading && (
				<div className='bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black'>
					<div className='mt-4 flex justify-center'>
						<div className='border-red h-8 w-8 animate-spin rounded-full border-t-4 border-solid'></div>
					</div>
				</div>
			)}
			{packages && (
				<>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4 font-bold transition hover:scale-105'>
							<button
								className='flex items-center'
								onClick={() => router.back()}
							>
								<Image
									alt='arrowBack'
									src='/arrows/arrowBack.svg'
									width={32}
									height={32}
								/>
								GO BACK
							</button>
						</div>
					</div>

					{packages[0] && (
						<div className='mt-4 flex flex-col gap-4'>
							<div className='mt-4 flex items-center gap-4'>
								<Image
									alt='userIcon'
									src='/package-icon.svg'
									width={48}
									height={48}
								/>
								<p className='text-2xl font-bold'>
									Package ID: {packages[0].id}
								</p>
							</div>
							<div className='flex items-center gap-4'>
								<p className='min-w-32 text-xl font-bold'>
									Package status:
								</p>
								<p className='text-xl font-bold'>
									{packages[0].status ?? 'N/A'}
								</p>
							</div>
							<div className='flex items-center gap-4'>
								<p className='min-w-32 text-xl font-bold'>
									Package price:
								</p>
								<p className='text-xl font-bold'>
									{packages[0].price ?? 'N/A'}
								</p>
							</div>
						</div>
					)}
					<div className='flex justify-between gap-4'>
						<div className='flex w-1/2 flex-col gap-2'>
							<Link
								className='mt-4 flex items-center gap-4'
								href={`/dashboard/couriers/${packages[0]?.sender?.id}`}
							>
								<Image
									alt='userIcon'
									src='/userIcon.svg'
									width={32}
									height={32}
								/>
								<p className='text-xl font-bold'>Sender:</p>
							</Link>

							<PackageUsersDetails
								userData={packages[0]?.sender}
								addressData={packages[0]?.senderAddress}
							/>
							<div className='mt-10 flex gap-4'>
								<Image
									alt='package-icon'
									src='/package-icon.svg'
									width={32}
									height={32}
								/>
								<p className='text-xl font-bold'>Size:</p>
							</div>
							<div className='flex gap-4'>
								<p className='min-w-32'>Width:</p>
								<p>
									{packages[0]?.packageSize.dimensions.width}{' '}
									cm
								</p>
							</div>
							<div className='flex gap-4'>
								<p className='min-w-32'>Height:</p>
								<p>
									{packages[0]?.packageSize.dimensions.height}{' '}
									cm
								</p>
							</div>
							<div className='flex gap-4'>
								<p className='min-w-32'>Depth:</p>
								<p>
									{packages[0]?.packageSize.dimensions.depth}{' '}
									cm
								</p>
							</div>
						</div>
						<div className='flex w-1/2 flex-col gap-2'>
							<Link
								href={`/dashboard/couriers/${packages[0]?.receiver?.id}`}
								className='mt-4 flex items-center gap-4'
							>
								<Image
									alt='userIcon'
									src='/userIcon.svg'
									width={32}
									height={32}
								/>
								<p className='text-xl font-bold'>Reciver:</p>
							</Link>
							<PackageUsersDetails
								userData={packages[0]?.receiver}
								addressData={packages[0]?.receiverAddress}
							/>
							<div className='mt-10 flex gap-4'>
								<Image
									alt='truck-delivery-icon'
									src='/truck-delivery-icon.svg'
									width={32}
									height={32}
								/>
								<p className='text-xl font-bold'>
									Delivery time:
								</p>
							</div>
							<div className='flex gap-4'>
								<p className='min-w-32'>Time:</p>
								<p>
									{packages[0]?.deliveryTime.workDaysAmount}{' '}
									days
								</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
