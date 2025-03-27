import React from 'react';
import {
	AddressType,
	LabelAdresType,
} from '@/app/dashboard/users/[userId]/dataTypes';

export default function Address({
	address,
	onAddressChange,
	editable,
}: {
	address: AddressType[];
	editable: boolean;
	onAddressChange: (
		index: number,
		key: keyof AddressType,
		value: string | number
	) => void;
}): React.JSX.Element {
	const labels: LabelAdresType = {
		country: 'COUNTRY',
		city: 'CITY',
		street: 'STREET',
		number: 'STREET NUMBER',
		postalCode: 'POSTAL CODE',
		apartment: 'APARTMENT',
	};

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
								<input
									type={'text'}
									value={address[key]}
									disabled={!editable}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>
									) =>
										onAddressChange(
											index,
											key,
											e.target.value
										)
									}
								/>
							</div>
						)
					)}
				</div>
			))}
		</>
	);
}
