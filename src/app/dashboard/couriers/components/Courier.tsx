import React from 'react';
import { CourierProps } from '../dataTypes';
import Image from 'next/image';
export default function Courier({ data }: CourierProps): React.JSX.Element {
	return (
		<div className='border-red flex flex-col items-center justify-center gap-4 rounded-2xl border-4 p-4'>
			<Image
				src={'/courierIcon.svg'}
				alt='Courier'
				width={64}
				height={64}
			/>
			<div className='flex w-full flex-col items-center'>
				<p className='text-center text-xl font-bold'>
					{data.firstName.toLocaleUpperCase()}{' '}
					{data.lastName.toLocaleUpperCase()}
				</p>
				<div className='flex w-full flex-col'>
					<div className='flex w-full justify-between'>
						<p>Area:</p>
						{data.area ? data.area : 'N/A'}
					</div>
					<div className='flex w-full justify-between'>
						<p>P. Assigned:</p>
						{data.assignedPackagesCount} / {data.maxPackages}
					</div>
				</div>
			</div>
		</div>
	);
}
