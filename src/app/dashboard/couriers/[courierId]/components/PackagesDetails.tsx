import React from 'react';
import { PackagesDetailsProps } from '../../dataTypes';
export default function PackagesDetails({
	stats,
}: PackagesDetailsProps): React.JSX.Element {
	return (
		<table>
			<tbody className='text-sm'>
				<tr className='mb-2 flex'>
					<td className='flex min-w-64 items-center font-bold'>
						Delivered:
					</td>
					<td>{stats.totalDeliveredPackages}</td>
				</tr>
				<tr className='mb-2 flex'>
					<td className='flex min-w-64 items-center font-bold'>
						Pending:
					</td>
					<td>{stats.pendingPackages}</td>
				</tr>
				{Object.keys(stats.packagesByStatus).length > 0 && (
					<>
						<tr className='mb-2 flex'>
							<td
								className='flex min-w-64 items-center text-xl font-bold'
								colSpan={2}
							>
								By Status:
							</td>
						</tr>
						{Object.entries(stats.packagesByStatus).map(
							([status, count]: [string, number]) => (
								<tr key={status} className='mb-2 flex'>
									<td className='flex min-w-64 items-center font-bold'>
										{status}:
									</td>
									<td>{count}</td>
								</tr>
							)
						)}
					</>
				)}
				{Object.keys(stats.packagesByArea).length > 0 && (
					<>
						<tr className='mb-2 flex'>
							<td
								className='flex min-w-64 items-center text-xl font-bold'
								colSpan={2}
							>
								By Area:
							</td>
						</tr>
						{Object.entries(stats.packagesByArea).map(
							([area, count]: [string, number]) => (
								<tr key={area} className='mb-2 flex'>
									<td className='flex min-w-64 items-center font-bold'>
										{area}:
									</td>
									<td>{count}</td>
								</tr>
							)
						)}
					</>
				)}
			</tbody>
		</table>
	);
}
