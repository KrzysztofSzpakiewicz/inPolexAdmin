import React from 'react';
import { PackageUsersDetailsProps } from '../../dataTypes';
import Image from 'next/image';

export default function PackageUsersDetails({
	userData,
	addressData,
}: PackageUsersDetailsProps): React.JSX.Element {
	return (
		<>
			{userData && (
				<>
					<div className='flex gap-4'>
						<p className='min-w-32'>Name:</p>
						<p>{userData.firstName}</p>
					</div>
					<div className='flex gap-4'>
						<p className='min-w-32'>LastName:</p>
						<p>{userData.lastName}</p>
					</div>
					<div className='flex gap-4'>
						<p className='min-w-32'>Phone:</p>
						<p>{userData.phoneNumber}</p>
					</div>
					<div className='flex gap-4'>
						<p className='min-w-32'>User name:</p>
						<p>{userData.userName}</p>
					</div>
				</>
			)}
			{addressData && (
				<>
					<div className='mt-4 flex items-center gap-4'>
						<Image
							alt='locationIcon'
							src='/locationIcon.svg'
							width={32}
							height={32}
						/>
						<p className='text-xl font-bold'>Address:</p>
					</div>
					<div className='flex gap-4'>
						<p className='min-w-32'>Country:</p>
						<p>{addressData.country}</p>
					</div>
					<div className='flex gap-4'>
						<p className='min-w-32'>City:</p>
						<p>{addressData.city}</p>
					</div>
					<div className='flex gap-4'>
						<p className='min-w-32'>Street:</p>
						<p>
							{addressData.street} / {addressData.number}
						</p>
					</div>
					<div className='flex gap-4'>
						<p className='min-w-32'>Postal code:</p>
						<p>{addressData.postalCode}</p>
					</div>
				</>
			)}
		</>
	);
}
