import React from 'react';
import { AddressLabelType, AddressPropsType } from '../dataTypes';

const labels: AddressLabelType = {
	country: 'COUNTRY',
	city: 'CITY',
	street: 'STREET',
	number: 'STREET NUMBER',
	apartment: 'APARTMENT',
	postalCode: 'POSTAL CODE',
};

export default function Address({
	address,
}: AddressPropsType): React.JSX.Element {
	return (
		<div className='border-red grid grid-cols-2 gap-2 rounded-xl border-4 p-4'>
			{(Object.keys(labels) as Array<keyof AddressLabelType>).map(
				(key: keyof AddressLabelType) => (
					<div className='flex flex-col' key={key}>
						<p className='font-bold'>{labels[key]}</p>
						<div className='flex items-center justify-between'>
							<p>{address[key]}</p>
						</div>
					</div>
				)
			)}
		</div>
	);
}
