'use client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { CourierType, PackageType } from '../dataTypes';
import CourierDetails from './components/CourierDetails';
import PackagesDetails from './components/PackagesDetails';
import Cookies from 'js-cookie';
const token: string = Cookies.get('authToken') || '';
export default function CourierPage(): React.JSX.Element {
	const router: AppRouterInstance = useRouter();
	const { courierId } = useParams();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [courierData, setCourierData] = React.useState<CourierType | null>(
		null
	);

	const [courierPackages, setCourierPackages] = React.useState<PackageType[]>(
		[]
	);
	// const { get, data, loading } = useGetFetch<CourierType>();

	useEffect(() => {
		const fetchCourier: () => Promise<void> = async (): Promise<void> => {
			try {
				setIsLoading(true);
				const response: Response = await fetch(
					`/api/courier/${courierId}`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const result: CourierType = await response.json();
				setCourierData(result);
			} catch (error) {
				console.error('Error fetching courier:', error);
			} finally {
				setIsLoading(false);
			}
		};
		const fetchCourierPackages: () => Promise<void> =
			async (): Promise<void> => {
				try {
					setIsLoading(true);
					const response: Response = await fetch(
						`/api/courier/${courierId}/packages`,
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${token}`,
							},
						}
					);
					const result: PackageType[] = await response.json();
					setCourierPackages(result);
				} catch (error) {
					console.error('Error fetching courier:', error);
				} finally {
					setIsLoading(false);
				}
			};
		if (courierId) {
			fetchCourier();
			fetchCourierPackages();
		}
	}, [courierId]);
	console.log(courierPackages);

	return (
		<div className='flex flex-col gap-4'>
			{isLoading && (
				<div className='bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black'>
					<div className='mt-4 flex justify-center'>
						<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
					</div>
				</div>
			)}
			<div className='flex items-center justify-between'>
				<div
					className='flex cursor-pointer items-center font-bold transition hover:scale-105'
					onClick={() => router.back()}
				>
					<Image
						alt='arrowBack'
						src='/arrows/arrowBack.svg'
						width={32}
						height={32}
					/>
					GO BACK
				</div>
				<Link
					className='text-light rounded-md bg-blue-600 px-4 py-2 font-bold hover:bg-blue-700'
					href={`/dashboard/users/${courierId}`}
				>
					MORE DETAILS
				</Link>
			</div>
			{courierData && (
				<>
					<div className='flex items-center gap-4'>
						<Image
							alt='userIcon'
							src='/courierIcon.svg'
							width={48}
							height={48}
						/>
						<p className='text-3xl font-bold'>
							{courierData.firstName} {courierData.lastName}
						</p>
					</div>
					<div className='flex w-full justify-between'>
						<div className='flex w-2/5 flex-col gap-2'>
							<div className='flex items-center gap-4 text-xl font-bold'>
								<Image
									alt='userIcon'
									src='/infoIcon.svg'
									width={24}
									height={24}
								/>
								COURIER INFO:
							</div>
							<CourierDetails
								phoneNumber={courierData.phoneNumber}
								area={courierData.area}
								assignedPackagesCount={
									courierData.assignedPackagesCount
								}
								maxPackages={courierData.maxPackages}
							/>
							<div className='flex items-center gap-4 text-xl font-bold'>
								<Image
									alt='locationIcon'
									src='/package-icon.svg'
									width={24}
									height={24}
								/>
								PACKAGES DETAILS:
							</div>
							<PackagesDetails stats={courierData.stats} />
						</div>
						<div className='flex w-3/5 flex-col gap-2'>
							<div className='flex items-center gap-4 text-xl font-bold'>
								<Image
									alt='locationIcon'
									src='/package-icon.svg'
									width={24}
									height={24}
								/>
								PACKAGES ASSIGNED:
							</div>
							TODO: wyświetlanie paczek od kuriera
						</div>
					</div>
				</>
			)}
		</div>
	);
}
