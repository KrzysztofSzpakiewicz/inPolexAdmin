import React, { useState } from 'react';
import { DeliveryTimeType, EditDeliveryTimeModalProps } from '../../dataTypes';

import InputComponent from '@/components/NewInput';
export default function EditDeliveryTimeModal({
	deliveryData,
	onCancel,
	onSetData,
}: EditDeliveryTimeModalProps): React.JSX.Element {
	const [deliveryTimeData, setDeliveryTimeData] =
		useState<DeliveryTimeType>(deliveryData);
	return (
		<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
			<div className='bg-lightGray flex flex-col gap-8 rounded-lg p-8 shadow-lg'>
				<h2 className='text-light text-center text-xl font-semibold'>
					EDIT DELIVERY TIME PRICE
				</h2>
				<form
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
						e.preventDefault();
						onSetData(deliveryTimeData);
					}}
					className='flex flex-col gap-2'
					id='deliveryTimeForm'
					action={undefined}
				>
					<InputComponent
						value={deliveryTimeData.workDaysAmount}
						onChange={
							((value: string | number) => {
								const numericValue: number =
									typeof value === 'string'
										? Number(value)
										: value;

								setDeliveryTimeData(
									(prev: DeliveryTimeType) => ({
										...prev,
										workDaysAmount: numericValue,
									})
								);
							}) as React.Dispatch<React.SetStateAction<number>>
						}
						placeholder='Days'
						isDisabled
						required
					/>
					<InputComponent
						value={deliveryTimeData.price}
						onChange={
							((value: string | number) => {
								const numericValue: number =
									typeof value === 'string'
										? Number(value)
										: value;

								setDeliveryTimeData(
									(prev: DeliveryTimeType) => ({
										...prev,
										price: numericValue,
									})
								);
							}) as React.Dispatch<React.SetStateAction<number>>
						}
						placeholder='Pirce'
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
						type='submit'
						form='deliveryTimeForm'
					>
						SAVE
					</button>
				</div>
			</div>
		</div>
	);
}
