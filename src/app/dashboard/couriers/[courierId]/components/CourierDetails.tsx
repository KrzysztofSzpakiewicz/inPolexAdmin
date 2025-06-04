/* eslint-disable react/prop-types */
import React from 'react';
import { CourierDetailsProps } from '../../dataTypes';
export default function CourierDetails({
	phoneNumber,
	area,
	assignedPackagesCount,
	maxPackages,
}: CourierDetailsProps): React.JSX.Element {
	const rows: { label: string; value: React.ReactNode }[] = [
		{ label: 'Phone Number:', value: phoneNumber },
		{ label: 'Area:', value: area },
		{
			label: 'Assigned Packages:',
			value: assignedPackagesCount,
		},
		{ label: 'Max Packages:', value: maxPackages },
	];

	return (
		<table>
			<tbody>
				{rows.map(
					({
						label,
						value,
					}: {
						label: string;
						value: React.ReactNode;
					}) => (
						<tr key={label} className='mb-2 flex'>
							<td className='flex min-w-64 items-center font-bold'>
								{label}
							</td>
							<td className='text-right'>{value}</td>
						</tr>
					)
				)}
			</tbody>
		</table>
	);
}
