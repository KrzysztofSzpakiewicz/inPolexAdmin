import React from 'react';
import {
	AddressType,
	LabelAdresType,
} from '@/app/dashboard/users/[userId]/dataTypes';
export default function Address({
	address,
}: {
	address: AddressType[];
}): React.JSX.Element {
	const labels: LabelAdresType = {
		country: 'COUNTRY',
		city: 'CITY',
		street: 'STREET',
		number: 'STREET NUMBER',
		apartment: 'APARTMENT',
		postalCode: 'POSTAL CODE',
	};
	// console.log('address', address[0]);

	return (
		<>
			{address.map((address: AddressType, index: number) => (
				<div
					className='border-red grid w-full grid-cols-2 gap-4 rounded-xl border-4 p-4'
					key={index}
				>
					{(Object.keys(labels) as Array<keyof LabelAdresType>).map(
						(key: keyof LabelAdresType) => (
							<div className='flex flex-col' key={key}>
								<p className='font-bold'>{labels[key]}</p>
								<div className='flex items-center justify-between'>
									<p>{address[key]}</p>
								</div>
							</div>
						)
					)}
				</div>
			))}
		</>
	);
}
