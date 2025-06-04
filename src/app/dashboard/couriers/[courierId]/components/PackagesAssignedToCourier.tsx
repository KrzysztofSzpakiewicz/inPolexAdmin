import React from 'react';
import { PackagesAssignedToCourierProps, PackageType } from '../../dataTypes';
export default function PackagesAssignedToCourier({
	packages,
}: PackagesAssignedToCourierProps): React.JSX.Element {
	return (
		<div className='scrollbar-track-transparent bg-lightGray h-[70vh] overflow-y-auto rounded-lg text-white'>
			<table className='min-w-full text-sm'>
				<thead>
					<tr className='bg-darkGray border-b-red border-b-2 font-semibold'>
						<th className='border-navyLight rounded-tl-lg px-4 py-2 text-left'>
							STATUS
						</th>
						<th className='border-navyLight px-4 py-2 text-left'>
							RECEIVER
						</th>
						<th className='border-navyLight px-4 py-2 text-left'>
							ADDRESS
						</th>
						<th className='border-navyLight px-4 py-2 text-left'>
							DELIVERY DATE
						</th>
						<th className='rounded-tr-lg px-4 py-2 text-left'>
							DETAILS
						</th>
					</tr>
				</thead>
				<tbody>
					{packages.map((pkg: PackageType, index: number) => {
						const isLast: boolean = index === packages.length - 1;
						return (
							<tr key={index} className={'bg-darkGray'}>
								<td
									className={`text-red border-navyLight px-4 py-2 ${isLast ? 'rounded-bl-lg' : ''}`}
								>
									{pkg.status === 'ASSIGNED_TO_COURIER'
										? 'ASSIGNED'
										: pkg.status}
								</td>
								<td className={'border-navyLight px-4 py-2'}>
									{pkg.receiverName || '-'}
								</td>
								<td className={'border-navyLight px-4 py-2'}>
									{pkg.address || '-'}
								</td>
								<td className={'border-navyLight px-4 py-2'}>
									{pkg.plannedDeliveryDate
										? pkg.plannedDeliveryDate
										: '-'}
								</td>
								<td
									className={`px-4 py-2 ${isLast ? 'rounded-br-lg' : ''}`}
								>
									TU PRZEKIEROWANIE
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
