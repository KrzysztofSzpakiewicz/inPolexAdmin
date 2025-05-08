import React from 'react';
export default function NewDeliveryTimeModal(): React.JSX.Element {
	return (
		<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
			<div className='bg-lightGray flex w-2/3 flex-col gap-4 rounded-lg p-8 shadow-lg'>
				<h2 className='text-light text-center text-xl font-semibold'>
					NEW DELIVERY TIME
				</h2>
			</div>
		</div>
	);
}
