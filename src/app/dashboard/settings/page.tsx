import React from 'react';
import Link from 'next/link';

export default function Settings(): React.JSX.Element {
	return (
		<div className='flex flex-wrap gap-4'>
			<Link
				href={'settings/packagesizes'}
				className='border-red flex h-48 w-64 flex-col rounded-xl border-4 p-4 transition duration-200 hover:scale-105'
			>
				<p className='text-red mb-4 text-xl font-bold'>PACKAGE SIZES</p>
				Change and set package parameters such as dimensions, weight and
				price.
			</Link>
			<Link
				href={'settings/deliverytime'}
				className='border-red flex h-48 w-64 flex-col rounded-xl border-4 p-4 transition duration-200 hover:scale-105'
			>
				<p className='text-red mb-4 text-xl font-bold'>DELIVERY TIME</p>
				Change and set delivery time parameters such as delivery days
				and price.
			</Link>
		</div>
	);
}
