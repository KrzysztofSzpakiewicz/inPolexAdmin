import React, { useState } from 'react';
import { PackageSizeEditModalProps, PackageSizeType } from '../../dataTypes';
import InputComponent from '@/components/NewInput';

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
					<InputComponent
						value={packageData.price}
						onChange={
							((value: string | number) => {
								const numericValue: number =
									typeof value === 'string'
										? Number(value)
										: value;

								setPackageData((prev: PackageSizeType) => ({
									...prev,
									price: numericValue,
								}));
							}) as React.Dispatch<React.SetStateAction<number>>
						}
						placeholder='Price'
						required
					/>
					<InputComponent
						value={packageData.maxWeight}
						onChange={
							((value: string | number) => {
								const numericValue: number =
									typeof value === 'string'
										? Number(value)
										: value;

								setPackageData((prev: PackageSizeType) => ({
									...prev,
									maxWeight: numericValue,
								}));
							}) as React.Dispatch<React.SetStateAction<number>>
						}
						placeholder='Max weight (KG)'
						required
					/>
					<p className='text-red font-semibold'>DIMENSIONS:</p>
					<InputComponent
						value={packageData.dimensions.width}
						onChange={
							((value: string | number) => {
								const numericValue: number =
									typeof value === 'string'
										? Number(value)
										: value;

								setPackageData((prev: PackageSizeType) => ({
									...prev,
									dimensions: {
										...packageData.dimensions,
										width: numericValue,
									},
								}));
							}) as React.Dispatch<React.SetStateAction<number>>
						}
						placeholder='Max width (cm)'
						required
					/>
					<InputComponent
						value={packageData.dimensions.depth}
						onChange={
							((value: string | number) => {
								const numericValue: number =
									typeof value === 'string'
										? Number(value)
										: value;

								setPackageData((prev: PackageSizeType) => ({
									...prev,
									dimensions: {
										...packageData.dimensions,
										depth: numericValue,
									},
								}));
							}) as React.Dispatch<React.SetStateAction<number>>
						}
						placeholder='Max depth (cm)'
						required
					/>
					<InputComponent
						value={packageData.dimensions.height}
						onChange={
							((value: string | number) => {
								const numericValue: number =
									typeof value === 'string'
										? Number(value)
										: value;

								setPackageData((prev: PackageSizeType) => ({
									...prev,
									dimensions: {
										...packageData.dimensions,
										height: numericValue,
									},
								}));
							}) as React.Dispatch<React.SetStateAction<number>>
						}
						placeholder='Max height (cm)'
						required
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
