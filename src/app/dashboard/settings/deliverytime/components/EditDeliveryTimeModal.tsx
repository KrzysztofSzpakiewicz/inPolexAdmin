import React, { useState } from 'react';
import { DeliveryTimeType, EditDeliveryTimeModalProps } from '../../dataTypes';
import Input from '@/components/Input';
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
					<Input
						type='number'
						value={deliveryTimeData.workDaysAmount}
						placeholder={'Working days'}
						onChange={(value: string | number) =>
							setDeliveryTimeData({
								...deliveryTimeData,
								workDaysAmount: Number(value),
							})
						}
						isDisabled={true}
					/>
					<Input
						type='number'
						value={deliveryTimeData.price}
						placeholder={'Price'}
						onChange={(value: string | number) =>
							setDeliveryTimeData({
								...deliveryTimeData,
								price: Number(value),
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
