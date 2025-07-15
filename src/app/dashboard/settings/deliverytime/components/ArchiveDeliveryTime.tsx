import React from 'react';
import { ArchiveDeliveryTimeProps, DeliveryTimeType } from '../../dataTypes';
export default function ArchiveDeliveryTime({
	data,
}: ArchiveDeliveryTimeProps): React.JSX.Element {
	return (
		<div className='scrollbar-track-transparent bg-lightGray flex h-[70vh] flex-col overflow-y-auto rounded-lg p-4 text-white'>
			{data &&
				data.map((deliveryTime: DeliveryTimeType, index: number) => (
					<div
						className={`bg-darkGray flex flex-row items-center justify-start gap-4 p-4 text-sm ${
							index === 0
								? 'rounded-t-lg'
								: 'border-red border-t-2'
						} ${index === data.length - 1 ? 'rounded-b-lg' : ''}`}
						key={index}
					>
						<p className='text-red w-16 min-w-16 text-center text-6xl font-bold'>
							{deliveryTime.workDaysAmount}
						</p>
						<div className='flex min-w-20 flex-col'>
							<div className=''>PRICE</div>
							<div className='font-bold'>
								{deliveryTime.price} PLN
							</div>
						</div>
						<div className='flex flex-col'>
							<div className=''>ARCHIVED AT</div>
							<div className='font-bold'>
								{deliveryTime.createdAt}
							</div>
						</div>
					</div>
				))}
		</div>
	);
}
