// import React, { useEffect } from 'react';
// import { PackageSizeTabProps, PackageSizeType } from '../dataTypes';
// import useGetFetch from '@/lib/useGetFetch';
// import Image from 'next/image';
// import PackageSizeHistoryModal from './PackageSize.BAK/PackageSizeHistoryModal';
// import PackageSizeModal from './PackageSize.BAK/PackageSizeModal';

// function Package({
// 	packageSize,
// 	isHovered,
// }: {
// 	packageSize: PackageSizeType;
// 	isHovered: number | undefined;
// }): React.JSX.Element {
// 	return (
// 		<div
// 			key={packageSize.id}
// 			className={`border-red flex min-w-44 cursor-pointer flex-col gap-2 rounded-xl border-4 p-4 text-sm transition-transform duration-300 ${
// 				isHovered === packageSize.id
// 					? 'translate-y-12 transform'
// 					: 'translate-y-0 transform'
// 			}`}
// 		>
// 			<p className='text-red text-center text-6xl font-bold'>
// 				{packageSize.size}
// 			</p>
// 			<div className='flex flex-col'>
// 				<div className=''>MAX DIMENSIONS</div>
// 				<div className='font-bold'>
// 					{packageSize.dimensions.width} X{' '}
// 					{packageSize.dimensions.depth} X{' '}
// 					{packageSize.dimensions.height}
// 				</div>
// 			</div>
// 			<div className='flex flex-col'>
// 				<div className=''>PRICE</div>
// 				<div className='font-bold'>{packageSize.price} PLN</div>
// 			</div>
// 			<div className='flex flex-col'>
// 				<div className=''>MAX WEIGHT</div>
// 				<div className='font-bold'>{packageSize.maxWeight} KG</div>
// 			</div>
// 		</div>
// 	);
// }

// export default function PackageSizeTab({
// 	token,
// 	onSetIsLoading,
// 	onSetError,
// }: PackageSizeTabProps): React.JSX.Element {
// 	const [showEditModal, setShowEditModal] = React.useState(false);
// 	const [showHistoryModal, setShowHistoryModal] = React.useState(false);
// 	const [selectedPackage, setSelectedPackage] =
// 		React.useState<PackageSizeType | null>(null);

// 	const [isHovered, setIsHovered] = React.useState<number | undefined>(
// 		undefined
// 	);

// 	const { get, data, error, loading } = useGetFetch<PackageSizeType[]>();

// 	useEffect(() => {
// 		onSetIsLoading?.(loading);
// 		if (error !== null) {
// 			onSetError?.(error);
// 		}
// 	}, [loading, onSetIsLoading, onSetError, error]);

// 	useEffect(() => {
// 		get(
// 			'/api/system-parameter/package-size?active=true&page=0&size=10',
// 			token
// 		);
// 	}, [get, token]);

// 	const handleSelectPackage: (packageSize: PackageSizeType) => void = (
// 		packageSize: PackageSizeType
// 	) => {
// 		setSelectedPackage(packageSize);
// 		setShowEditModal(true);
// 	};

// 	return (
// 		<div className='flex flex-col gap-2'>
// 			{showHistoryModal && (
// 				<PackageSizeHistoryModal
// 					token={token}
// 					onCancel={() => setShowHistoryModal(false)}
// 					onSetIsLoading={onSetIsLoading}
// 				/>
// 			)}
// 			{showEditModal && selectedPackage && (
// 				<PackageSizeModal
// 					token={token}
// 					packageSize={selectedPackage}
// 					onCancel={() => setShowEditModal(false)}
// 					onSetIsLoading={onSetIsLoading}
// 				/>
// 			)}
// 			<p className='text-xl font-semibold'>
// 				TODO:(IKONA DO ZMIANY), przeniesienie posta wyżejs
// 				<br />
// 				PACKAGE SIZES
// 			</p>
// 			<div className='flex flex-row gap-2'>
// 				{data &&
// 					data
// 						.sort((a: PackageSizeType, b: PackageSizeType) => {
// 							const sizeOrder: string[] = ['S', 'M', 'L', 'XL'];
// 							return (
// 								sizeOrder.indexOf(a.size) -
// 								sizeOrder.indexOf(b.size)
// 							);
// 						})
// 						.map((packageSize: PackageSizeType) => (
// 							<div
// 								className='relative min-w-44 overflow-hidden'
// 								key={packageSize.id}
// 								onMouseEnter={() =>
// 									setIsHovered(packageSize.id)
// 								}
// 								onMouseLeave={() => setIsHovered(undefined)}
// 							>
// 								<div
// 									className={`bg-red absolute flex w-full cursor-pointer items-center justify-center rounded py-2 text-center font-bold transition-transform duration-300 ${
// 										isHovered === packageSize.id
// 											? 'translate-y-0 transform'
// 											: '-translate-y-full transform'
// 									}`}
// 									onClick={() =>
// 										handleSelectPackage(packageSize)
// 									}
// 								>
// 									<Image
// 										src={'/editIcon.svg'}
// 										width={20}
// 										height={20}
// 										alt='editIcon'
// 										color='white'
// 									/>
// 									EDIT
// 								</div>
// 								<Package
// 									packageSize={packageSize}
// 									isHovered={isHovered}
// 								/>
// 							</div>
// 						))}
// 				<div className='flex w-44 flex-col gap-2'>
// 					<div
// 						onClick={() => setShowHistoryModal(true)}
// 						className='border-red flex h-full min-w-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-4 border-dashed p-4 text-sm transition hover:scale-105'
// 					>
// 						<Image
// 							src={'/historyIcon.svg'}
// 							width={40}
// 							height={40}
// 							alt='historyIcon'
// 						/>
// 						<p className='font-bold'>ARCHIVED</p>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
