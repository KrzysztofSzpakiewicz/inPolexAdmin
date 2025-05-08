// import React, { useEffect } from 'react';
// import {
// 	PackageSizeModalProps,
// 	PackageSizeResponse,
// 	PackageSizeType,
// } from '../../dataTypes';
// import Input from '@/components/Input';
// import usePostFetch from '@/lib/usePostFetch';
// export default function PackageSizeModal({
// 	packageSize,
// 	onCancel,
// 	onSetIsLoading,
// 	onSetError,
// }: PackageSizeModalProps): React.JSX.Element {
// 	const { post, error, loading } = usePostFetch<
// 		PackageSizeType,
// 		PackageSizeResponse
// 	>();

// 	const [packages, setPackages] =
// 		React.useState<PackageSizeType>(packageSize);

// 	useEffect(() => {
// 		onSetIsLoading?.(loading);
// 		if (error !== null) {
// 			onSetError?.(error);
// 		}
// 	}, [loading, onSetIsLoading, onSetError, error]);

// 	const handleSubmit: () => void = () => {
// 		post('/api/system-parameter/package-size', packages);
// 		post(`/api/system-parameter/package-size/${packages.id}`);
// 	};

// 	return (
// 		<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
// 			<div className='bg-lightGray flex flex-col gap-8 rounded-lg p-8 shadow-lg'>
// 				<h2 className='flex items-center justify-center gap-2 text-center text-2xl font-bold'>
// 					EDIT PACKAGE SIZE{' '}
// 					<span className='text-red text-center text-3xl font-bold'>
// 						{packages.size}
// 					</span>
// 				</h2>

// 				<form
// 					className='flex flex-col gap-2'
// 					onSubmit={handleSubmit}
// 					id='packageSizeForm'
// 					action={undefined}
// 				>
// 					<Input
// 						type='number'
// 						value={packages.price}
// 						placeholder={'Price'}
// 						onChange={(value: string | number) =>
// 							setPackages({ ...packages, price: Number(value) })
// 						}
// 					/>
// 					<Input
// 						type='number'
// 						value={packages.maxWeight}
// 						placeholder={'Max weight (KG)'}
// 						onChange={(value: string | number) =>
// 							setPackages({
// 								...packages,
// 								maxWeight: Number(value),
// 							})
// 						}
// 					/>

// 					<p className='text-red font-semibold'>DIMENSIONS:</p>
// 					<Input
// 						type='number'
// 						value={packages.dimensions.width}
// 						placeholder={'Max width (cm)'}
// 						onChange={(value: string | number) =>
// 							setPackages({
// 								...packages,
// 								dimensions: {
// 									...packages.dimensions,
// 									width: Number(value),
// 								},
// 							})
// 						}
// 					/>
// 					<Input
// 						type='number'
// 						value={packages.dimensions.depth}
// 						placeholder={'Max depth (cm)'}
// 						onChange={(value: string | number) =>
// 							setPackages({
// 								...packages,
// 								dimensions: {
// 									...packages.dimensions,
// 									depth: Number(value),
// 								},
// 							})
// 						}
// 					/>
// 					<Input
// 						type='number'
// 						value={packages.dimensions.height}
// 						placeholder={'Max height (cm)'}
// 						onChange={(value: string | number) =>
// 							setPackages({
// 								...packages,
// 								dimensions: {
// 									...packages.dimensions,
// 									height: Number(value),
// 								},
// 							})
// 						}
// 					/>
// 				</form>
// 				<div className='flex flex-row items-center justify-center gap-4'>
// 					<button
// 						className='bg-red text-light rounded px-4 py-2 font-bold transition hover:bg-red-600'
// 						onClick={onCancel}
// 					>
// 						CLOSE
// 					</button>
// 					<button
// 						className='bg-green text-light rounded px-4 py-2 font-bold transition hover:bg-green-600'
// 						type='submit'
// 						form='packageSizeForm'
// 					>
// 						SAVE
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
