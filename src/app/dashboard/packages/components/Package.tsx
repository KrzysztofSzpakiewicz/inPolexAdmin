import React from 'react';
import { PackageProps } from '../dataTypes';
import Image from 'next/image';
export default function Package({ data }: PackageProps): React.JSX.Element {
	return (
		<div className='border-red flex flex-col items-center justify-center gap-4 rounded-2xl border-4 p-4'>
			<Image
				src={'/package-icon.svg'}
				alt='Courier'
				width={64}
				height={64}
			/>
			<div className='flex w-full flex-col items-center'>
				<div className='flex w-full flex-col'>
					<div className='flex w-full justify-between'>
						<p>ID:</p>
						{data.id}
					</div>
					<div className='flex w-full justify-between'>
						<p>P. status:</p>
						{data.status ?? 'N/A'}
					</div>
					<div className='flex w-full justify-between'>
						<p>Planed delivery:</p>
						{data.plannedDeliveryDate ?? 'N/A'}
					</div>
				</div>
			</div>
		</div>
	);
}
