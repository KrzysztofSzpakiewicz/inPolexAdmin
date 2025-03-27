import React from 'react';
import {
	AddressType,
	LabelAdresType,
} from '@/app/dashboard/users/[userId]/dataTypes';
import Image from 'next/image';

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
		apartment: 'APARTMENT',
		postalCode: 'POSTAL CODE',
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
								<div className='flex items-center justify-between'>
									<input
										className='max-w-40'
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
									{editable && (
										<Image
											alt='editIcon'
											src='/editIcon.svg'
											width={24}
											height={24}
										/>
									)}
								</div>
							</div>
						)
					)}
				</div>
			))}
		</>
	);
}
