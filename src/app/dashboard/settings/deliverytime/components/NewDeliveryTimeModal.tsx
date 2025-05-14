import React, { useState } from 'react';
import { DeliveryTimeType, NewDeliveryTimeModalProps } from '../../dataTypes';
import Input from '@/components/Input';
export default function NewDeliveryTimeModal({
	onCancel,
	onSetData,
	deliveryTimeData,
}: NewDeliveryTimeModalProps): React.JSX.Element {
	const [workDaysAmount, setWorkDaysAmount] = useState<number>(1);
	const [price, setPrice] = useState<number>(1);
	const [canAddNewDeliveryTime, setCanAddNewDeliveryTime] =
		useState<boolean>(false);

	const handleSave: () => void = () => {
		const exists: boolean = deliveryTimeData.some(
			(item: DeliveryTimeType) => {
				return item.workDaysAmount === workDaysAmount;
			}
		);
		if (exists) {
			setCanAddNewDeliveryTime(true);
			return;
		}

		onSetData(workDaysAmount, price);
	};
	return (
		<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
			<div className='bg-lightGray flex flex-col gap-8 rounded-lg p-8 shadow-lg'>
				<h2 className='text-light text-center text-xl font-semibold'>
					NEW DELIVERY TIME
				</h2>
				<div className=''>
					<Input
						type='number'
						value={workDaysAmount}
						placeholder='Days'
						onChange={(val: string | number) => {
							setCanAddNewDeliveryTime(false);
							setWorkDaysAmount(Number(val));
						}}
					/>
					<Input
						type='number'
						value={price}
						placeholder='Price'
						onChange={(val: string | number) =>
							setPrice(Number(val))
						}
					/>
				</div>
				{canAddNewDeliveryTime && (
					<p className='text-red animate-pulse text-center text-xl font-bold'>
						DELIVERY TIME ALREADY EXISTS
					</p>
				)}
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
						onClick={handleSave}
					>
						SAVE
					</button>
				</div>
			</div>
		</div>
	);
}
