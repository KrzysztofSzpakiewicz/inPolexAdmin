// import React, { useEffect } from 'react';
// import { PackageSizeHistoryModalProps, PackageSizeType } from '../../dataTypes';
// import useGetFetch from '@/lib/useGetFetch';
// export default function PackageSizeHistoryModal({
// 	token,
// 	onCancel,
// 	onSetIsLoading,
// 	onSetError,
// }: PackageSizeHistoryModalProps): React.JSX.Element {
// 	const { get, data, error, loading } = useGetFetch<PackageSizeType[]>();
// 	useEffect(() => {
// 		if (token) {
// 			get(
// 				'/api/system-parameter/package-size?active=false&page=0&size=10',
// 				token
// 			);
// 		}
// 	}, [token, get]);

// 	useEffect(() => {
// 		onSetIsLoading?.(loading);
// 		if (error !== null) {
// 			onSetError?.(error);
// 		}
// 	}, [loading, onSetIsLoading, onSetError, error]);

// 	return (
// 		<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
// 			<div className='bg-lightGray flex flex-col gap-8 rounded-lg p-8 shadow-lg'>
// 				<h2 className='text-center text-2xl font-bold'>
// 					ARCHIVED PACKAGE SIZES
// 				</h2>

// 				<div className='scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-transparent flex max-h-96 flex-col overflow-y-auto'>
// 					{data &&
// 						data.map(
// 							(packageSize: PackageSizeType, index: number) => (
// 								<div
// 									className={`bg-darkGray flex flex-row items-center justify-start gap-4 p-4 text-sm ${
// 										index === 0
// 											? 'rounded-t-lg'
// 											: 'border-red border-t-2'
// 									} ${
// 										index === data.length - 1
// 											? 'rounded-b-lg'
// 											: ''
// 									}`}
// 									key={index}
// 								>
// 									<p className='text-red text-center text-6xl font-bold'>
// 										{packageSize.size}
// 									</p>
// 									<div className='flex flex-col'>
// 										<div className=''>MAX DIMENSIONS</div>
// 										<div className='font-bold'>
// 											{packageSize.dimensions.width} X{' '}
// 											{packageSize.dimensions.depth} X{' '}
// 											{packageSize.dimensions.height}
// 										</div>
// 									</div>
// 									<div className='flex flex-col'>
// 										<div className=''>PRICE</div>
// 										<div className='font-bold'>
// 											{packageSize.price} PLN
// 										</div>
// 									</div>
// 									<div className='flex flex-col'>
// 										<div className=''>MAX WEIGHT</div>
// 										<div className='font-bold'>
// 											{packageSize.maxWeight} KG
// 										</div>
// 									</div>
// 									<div className='flex flex-col'>
// 										<div className=''>ARCHIVED AT</div>
// 										<div className='font-bold'>
// 											CHUJ WIE KIEDY JAK RADEK DODA
// 										</div>
// 									</div>
// 								</div>
// 							)
// 						)}
// 				</div>
// 				<div className='flex justify-center'>
// 					<button
// 						className='bg-red rounded px-4 py-2 font-bold text-white transition hover:bg-red-600'
// 						onClick={onCancel}
// 					>
// 						CLOSE
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
