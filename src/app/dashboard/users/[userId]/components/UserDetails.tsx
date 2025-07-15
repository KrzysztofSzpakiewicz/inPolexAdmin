import React from 'react';
import { UserDetailsPropsType } from '../dataTypes';
import Image from 'next/image';
export default function UserDetails({
	userData,
}: UserDetailsPropsType): React.JSX.Element {
	return (
		<table className='text-sm'>
			<tbody>
				{Object.entries(userData)
					.filter(([key]: [string, unknown]) => key !== 'address')
					.map(([key, value]: [string, string | boolean]) => (
						<tr key={key} className='mb-2 flex'>
							<td className='flex w-32 items-center font-bold'>
								{key.charAt(0).toUpperCase() + key.slice(1)}:
							</td>
							<td className='flex items-center'>
								{typeof value === 'boolean' ? (
									value ? (
										<Image
											src='/yesIcon.svg'
											alt='checkIcon'
											width={32}
											height={32}
										/>
									) : (
										<Image
											src='/noIcon.svg'
											alt='crossIcon'
											width={32}
											height={32}
										/>
									)
								) : (
									value
								)}
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}
