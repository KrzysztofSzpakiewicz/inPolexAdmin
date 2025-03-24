import React from 'react';
import { AddressType } from '@/app/dashboard/users/[userId]/dataTypes';

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

export default function Address({
	address,
}: {
	address: AddressType;
}): React.JSX.Element {
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
