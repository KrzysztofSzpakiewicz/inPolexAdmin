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
	return (
		<div className='border-red flex w-full items-center rounded-2xl border-3 p-4'>
			<Image
				src={'/userIcon.svg'}
				width={64}
				height={64}
				alt='User Icon'
			/>
			<div className='ml-4 flex h-full flex-col'>
				<div className='flex gap-2 text-xl font-bold'>
					<span>{firstName}</span>
					<span>{lastName}</span>
				</div>
				<div className='flex gap-8 text-sm'>
					<div className='flex items-center gap-2'>
						<span>ID:</span>
						<span>{id}</span>
					</div>
					<div className='flex items-center gap-2'>
						<span>ROLE:</span>
						<span>{role.substring(5)}</span>
					</div>
				</div>
				<div className='flex gap-2'>
					<span>E-MAIL:</span>
					<span>{email}</span>
				</div>
			</div>
		</div>
	);
}
