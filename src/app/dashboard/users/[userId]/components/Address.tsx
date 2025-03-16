import React from 'react';

interface AddressType {
	id: number;
	country: string;
	city: string;
	street: string;
	number: number;
	postalCode: string;
}

function Item({
	header,
	value,
}: {
	value: string;
	header: string;
}): React.JSX.Element {
	return (
		<div className='w-1/2'>
			<p className='font-bold'>{header}</p>
			<p className='text-sm font-semibold'>{value}</p>
		</div>
	);
}

interface AddressProps {
	address: AddressType;
}

export default function Address({ address }: AddressProps): React.JSX.Element {
	return (
		<div className='border-red flex w-4/5 flex-col gap-4 rounded-xl border-4 p-4'>
			<div className='flex'>
				<Item header={'COUNTRY'} value={address.country} />
				<Item header={'CITY'} value={address.city} />
			</div>
			<div className='flex'>
				<Item header={'STREET'} value={address.street} />
				<Item header={'NUMBER'} value={address.number.toString()} />
			</div>
			<Item header={'POSTAL CODE'} value={address.postalCode} />
		</div>
	);
}
