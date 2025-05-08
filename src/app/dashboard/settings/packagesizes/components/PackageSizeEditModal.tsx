import React, { useState } from 'react';
import { PackageSizeEditModalProps } from '../../dataTypes';
import Input from '@/components/Input';

export default function PackageSizeEditModal({
	data,
	onCancel,
	onSetData,
}: PackageSizeEditModalProps): React.JSX.Element {
	const [packageData, setPackageData] = useState(data);

	return (
		<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
			<div className='bg-lightGray flex flex-col gap-8 rounded-lg p-8 shadow-lg'>
				<h2 className='flex items-center justify-center gap-2 text-center text-2xl font-bold'>
					EDIT PACKAGE SIZE{' '}
					<span className='text-red text-center text-3xl font-bold'>
						{packageData.size}
					</span>
				</h2>

				<form
					className='flex flex-col gap-2'
					id='packageSizeForm'
					action={undefined}
				>
					<Input
						type='number'
						value={packageData.price}
						placeholder={'Price'}
						onChange={(value: string | number) =>
							setPackageData({
								...packageData,
								price: Number(value),
							})
						}
					/>
					<Input
						type='number'
						value={packageData.maxWeight}
						placeholder={'Max weight (KG)'}
						onChange={(value: string | number) =>
							setPackageData({
								...packageData,
								maxWeight: Number(value),
							})
						}
					/>

					<p className='text-red font-semibold'>DIMENSIONS:</p>
					<Input
						type='number'
						value={packageData.dimensions.width}
						placeholder={'Max width (cm)'}
						onChange={(value: string | number) =>
							setPackageData({
								...packageData,
								dimensions: {
									...packageData.dimensions,
									width: Number(value),
								},
							})
						}
					/>
					<Input
						type='number'
						value={packageData.dimensions.depth}
						placeholder={'Max depth (cm)'}
						onChange={(value: string | number) =>
							setPackageData({
								...packageData,
								dimensions: {
									...packageData.dimensions,
									depth: Number(value),
								},
							})
						}
					/>
					<Input
						type='number'
						value={packageData.dimensions.height}
						placeholder={'Max height (cm)'}
						onChange={(value: string | number) =>
							setPackageData({
								...packageData,
								dimensions: {
									...packageData.dimensions,
									height: Number(value),
								},
							})
						}
					/>
				</form>
				<div className='flex flex-row items-center justify-center gap-4'>
					<button
						className='bg-red text-light rounded px-4 py-2 font-bold transition hover:bg-red-600'
						onClick={onCancel}
					>
						CLOSE
					</button>
					<button
						className='bg-green text-light rounded px-4 py-2 font-bold transition hover:bg-green-600'
						type='button'
						onClick={() => onSetData(packageData)}
					>
						SAVE
					</button>
				</div>
			</div>
		</div>
	);
}
