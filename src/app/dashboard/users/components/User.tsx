'use client';

import React from 'react';
import { UserComponentType } from '@/app/dashboard/users/dataTypes';

export default function User({
	id,
	firstName,
	lastName,
	email,
	role,
}: UserComponentType): React.JSX.Element {
	const borderColor: 'border-red' | 'border-light' =
		role === 'ROLE_ADMIN' ? 'border-red' : 'border-light';
	return (
		<div
			className={`bg-navyLight mb-2 rounded-lg border-2 p-4 ${borderColor} flex items-center justify-between`}
		>
			<div>
				<h3 className='text-lg font-semibold'>
					{firstName} {lastName}
				</h3>
				<p className='text-gray-300'>{email}</p>
				<p className='text-sm text-gray-400'>ID: {id}</p>
				<p className='text-sm text-gray-400'>Account type: {role}</p>
			</div>
		</div>
	);
}
