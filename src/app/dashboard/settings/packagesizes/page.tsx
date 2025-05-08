'use client';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { PackageSizeResponse, PackageSizeType } from '../dataTypes';
import useGetFetch from '@/lib/useGetFetch';
import PackageSizeEditModal from './components/PackageSizeEditModal';
import PackageSizeHistory from './components/PackageSizeHistory';
import usePostFetch from '@/lib/usePostFetch';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
const token: string = Cookies.get('authToken') || '';

function Package({
	packageSize,
	isHovered,
}: {
	packageSize: PackageSizeType;
	isHovered: number | undefined;
}): React.JSX.Element {
	return (
		<div
			key={packageSize.id}
			className={`flex items-center gap-4 rounded-xl border-4 border-red-500 p-4 text-sm transition-transform duration-300 ${
				isHovered === packageSize.id
					? 'translate-x-35'
					: 'translate-x-0'
			}`}
		>
			<p className='text-red min-w-20 text-center text-6xl font-bold'>
				{packageSize.size}
			</p>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-col'>
					<div className=''>MAX DIMENSIONS</div>
					<div className='font-bold'>
						{packageSize.dimensions.width}cm X{' '}
						{packageSize.dimensions.depth}cm X{' '}
						{packageSize.dimensions.height}cm
					</div>
				</div>
				<div className='flex flex-col'>
					<div className=''>PRICE</div>
					<div className='font-bold'>{packageSize.price} PLN</div>
				</div>
			</div>
			<div
				className={`flex flex-col gap-2 ${packageSize.createdAt && 'justify-start'}`}
			>
				<div className='flex flex-col'>
					<div className=''>MAX WEIGHT</div>
					<div className='font-bold'>{packageSize.maxWeight} KG</div>
				</div>
				{packageSize.createdAt && (
					<div className='flex flex-col'>
						<div className=''>LAST MODIFIED</div>
						<div className='font-bold'>{packageSize.createdAt}</div>
					</div>
				)}
			</div>
		</div>
	);
}
export default function Sizes(): React.JSX.Element {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [isEditModalOpen, setIsEditModalOpen] =
		React.useState<boolean>(false);
	const [isHovered, setIsHovered] = React.useState<number | undefined>(
		undefined
	);
	const [selectedPackage, setSelectedPackage] =
		React.useState<PackageSizeType | null>(null);
	const [reFetch, setReFetch] = React.useState<boolean>(false);
	const {
		get: getActive,
		data: activeData,
		loading: activeLoading,
	} = useGetFetch<PackageSizeType[]>();
	const {
		get: getArchived,
		data: archivedData,
		loading: archivedLoading,
	} = useGetFetch<PackageSizeType[]>();

	const { post, loading: postLoading } = usePostFetch<
		PackageSizeType,
		PackageSizeResponse
	>();

	const router: AppRouterInstance = useRouter();

	const handleOnSetData: (updatedData: PackageSizeType) => void = async (
		updatedData: PackageSizeType
	) => {
		post('/api/system-parameter/package-size', updatedData);
		post(`/api/system-parameter/package-size/${updatedData.id}`);
		setReFetch(!reFetch);
		setIsEditModalOpen(false);
	};

	useEffect(() => {
		setIsLoading(activeLoading || archivedLoading || postLoading);
	}, [activeLoading, archivedLoading, postLoading]);

	useEffect(() => {
		getActive('/api/system-parameter/package-size?active=true', token);
		getArchived('/api/system-parameter/package-size?active=false', token);
	}, [getActive, getArchived, reFetch]);

	const handleSelectPackage: (packageSize: PackageSizeType) => void = (
		packageSize: PackageSizeType
	) => {
		setSelectedPackage(packageSize);
		setIsEditModalOpen(true);
	};

	return (
		<div className='flex h-full w-full flex-col'>
			{isLoading && (
				<div className='bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black'>
					<div className='mt-4 flex justify-center'>
						<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
					</div>
				</div>
			)}
			{isEditModalOpen && selectedPackage && (
				<PackageSizeEditModal
					data={selectedPackage}
					onCancel={() => setIsEditModalOpen(false)}
					onSetData={handleOnSetData}
				/>
			)}
			<button
				className='flex items-center font-bold transition'
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
			<h1 className='mb-4 text-2xl font-bold'>PACKAGE SIZES SETTINGS</h1>
			<div className='flex h-full flex-row'>
				<div className='flex h-full w-1/2 flex-col gap-2'>
					<h2>MODIFY PACKAGE SIZE</h2>
					{activeData &&
						!isLoading &&
						activeData
							.sort((a: PackageSizeType, b: PackageSizeType) => {
								const sizeOrder: string[] = [
									'S',
									'M',
									'L',
									'XL',
								];
								return (
									sizeOrder.indexOf(a.size) -
									sizeOrder.indexOf(b.size)
								);
							})
							.map((packageSize: PackageSizeType) => (
								<div
									className='relative w-3/4 overflow-hidden'
									key={packageSize.id}
									onMouseEnter={() =>
										setIsHovered(packageSize.id)
									}
									onMouseLeave={() => setIsHovered(undefined)}
								>
									<div
										className={`bg-red absolute inset-y-0 left-0 flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl px-4 text-xl font-bold text-white transition-transform duration-300 ${
											isHovered === packageSize.id
												? 'translate-x-0'
												: '-translate-x-full'
										}`}
										onClick={() =>
											handleSelectPackage(packageSize)
										}
									>
										EDIT
									</div>
									<Package
										packageSize={packageSize}
										isHovered={isHovered}
									/>
								</div>
							))}
				</div>
				<div className='flex max-h-screen w-1/2 flex-col gap-2 overflow-auto'>
					<h2>ARCHIVED PACKAGES</h2>
					<PackageSizeHistory data={archivedData || []} />
				</div>
			</div>
		</div>
	);
}
