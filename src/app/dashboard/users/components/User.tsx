'use client';

import React from 'react';
import { UserComponentType } from '@/app/dashboard/users/dataTypes';
import Image from 'next/image';

export default function User({
	id,
	firstName,
	lastName,
	email,
	role,
}: UserComponentType): React.JSX.Element {
	// const borderColor: 'border-red' | 'border-light' =
	// 	role === 'ROLE_ADMIN' ? 'border-red' : 'border-light';
	return (
		// <div
		// 	className={`bg-navyLight mb-2 rounded-lg border-2 p-4 ${borderColor} flex items-center justify-between`}
		// >
		// 	<div>
		// 		<h3 className='text-lg font-semibold'>
		// 			{firstName} {lastName}
		// 		</h3>
		// 		<p className='text-gray-300'>{email}</p>
		// 		<p className='text-sm text-gray-400'>ID: {id}</p>
		// 		<p className='text-sm text-gray-400'>Account type: {role}</p>
		// 	</div>
		// </div>
		<div className='border-red flex min-w-72 flex-col items-center rounded-2xl border-3 p-4'>
			<Image
				src={'/userIcon.svg'}
				width={64}
				height={64}
				alt='User Icon'
			/>
			<span className='text-xl font-bold'>{firstName}</span>
			<span className='text-xl font-bold'>{lastName}</span>
			<div className='flex w-full flex-col gap-2'>
				<div className='flex w-full items-center justify-between'>
					<span className='text-xs'>ID:</span>
					<span className='text-xs'>{id}</span>
				</div>
				<div className='flex w-full items-center justify-between'>
					<span className='text-xs'>EMAIL:</span>
					<span className='text-xs'>{email}</span>
				</div>
				<div className='flex w-full items-center justify-between'>
					<span className='text-xs'>TYPE:</span>
					<span className='text-xs'>{role}</span>
				</div>
			</div>
		</div>
	);
}
