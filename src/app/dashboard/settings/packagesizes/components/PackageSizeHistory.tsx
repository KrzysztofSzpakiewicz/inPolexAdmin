import React from 'react';
import { PackageSizeHistoryProps, PackageSizeType } from '../../dataTypes';
export default function PackageSizeHistory({
	data,
}: PackageSizeHistoryProps): React.JSX.Element {
	return (
		<div className='scrollbar-track-transparent bg-lightGray flex h-[70vh] flex-col overflow-y-auto rounded-lg p-4 text-white'>
			{data &&
				data.map((packageSize: PackageSizeType, index: number) => (
					<div
						className={`bg-darkGray flex flex-row items-center justify-start gap-4 p-4 text-sm ${
							index === 0
								? 'rounded-t-lg'
								: 'border-red border-t-2'
						} ${index === data.length - 1 ? 'rounded-b-lg' : ''}`}
						key={index}
					>
						<p className='text-red text-center text-6xl font-bold'>
							{packageSize.size}
						</p>
						<div className='flex flex-col'>
							<div className=''>MAX DIMENSIONS</div>
							<div className='font-bold'>
								{packageSize.dimensions.width} X{' '}
								{packageSize.dimensions.depth} X{' '}
								{packageSize.dimensions.height}
							</div>
						</div>
						<div className='flex flex-col'>
							<div className=''>PRICE</div>
							<div className='font-bold'>
								{packageSize.price} PLN
							</div>
						</div>
						<div className='flex flex-col'>
							<div className=''>MAX WEIGHT</div>
							<div className='font-bold'>
								{packageSize.maxWeight} KG
							</div>
						</div>
						<div className='flex flex-col'>
							<div className=''>ARCHIVED AT</div>
							<div className='font-bold'>
								CHUJ WIE KIEDY JAK RADEK DODA
							</div>
						</div>
					</div>
				))}
		</div>
	);
}
