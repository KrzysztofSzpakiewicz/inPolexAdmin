/* eslint-disable */
import { FetchedPackages } from '@/app/dashboard/packages/dataTypes';
import React from 'react';
import { UserPackagesProps } from '../dataTypes';
import Image from 'next/image';
import Link from 'next/link';
export default function UserPackages({ packages, userId }: UserPackagesProps) {
	return (
		<div className='scrollbar-track-transparent bg-lightGray flex h-[70vh] w-full flex-col overflow-y-auto rounded-lg text-white'>
			{packages &&
				packages.map(
					(signlePackage: FetchedPackages, index: number) => (
						<div
							className={`bg-darkGray flex flex-row items-center justify-between gap-4 p-4 text-sm ${
								index === 0
									? 'rounded-t-lg'
									: 'border-red border-t-2'
							} ${index === packages.length - 1 ? 'rounded-b-lg' : ''}`}
							key={index}
						>
							<div className='flex flex-row items-center justify-start gap-4'>
								<Image
									src={
										signlePackage.sender.id === userId
											? '/packageReceivedIcon.svg'
											: '/packageSentIcon.svg'
									}
									width={32}
									height={32}
									alt='Sender Icon'
									className='h-10 w-10'
								/>
								<p className='text-red text-center text-6xl font-bold'></p>

								<div className='flex flex-col'>
									<div className=''>IN/OUT</div>
									<div className='font-bold'>
										{signlePackage.sender.id === userId
											? 'Incoming'
											: 'Outgoing'}
									</div>
								</div>
								<div className='flex flex-col'>
									<div className=''>STATUS</div>
									<div className='font-bold'>
										{signlePackage.status ?? 'N/A'}
									</div>
								</div>
								{signlePackage.sender.id === userId ? (
									<div className='flex flex-col'>
										<div className=''>SENT FROM</div>
										<Link
											className='flex items-center gap-2'
											href={`/dashboard/users/${signlePackage.receiver.id}`}
										>
											<Image
												src={'/userIcon.svg'}
												width={24}
												alt='Sender Icon'
												height={24}
											/>
											<div className='font-bold'>
												{
													signlePackage.receiver
														.firstName
												}{' '}
												{
													signlePackage.receiver
														.lastName
												}
											</div>
										</Link>
									</div>
								) : (
									<div className='flex flex-col'>
										<div className=''>SENT TO</div>
										<Link
											className='flex items-center gap-2'
											href={`/dashboard/users/${signlePackage.sender.id}`}
										>
											<Image
												src={'/userIcon.svg'}
												width={24}
												alt='Sender Icon'
												height={24}
											/>
											<div className='font-bold'>
												{signlePackage.sender.firstName}{' '}
												{signlePackage.sender.lastName}
											</div>
										</Link>
									</div>
								)}
								<div className='flex flex-col'>
									<div className=''>ETA</div>
									<div className='font-bold'>
										{signlePackage.plannedDeliveryDate}
									</div>
								</div>
							</div>
							<>
								<Link
									className='flex items-center gap-2'
									href={`/dashboard/packages/${signlePackage.id}`}
								>
									GO TO PACKAGE
								</Link>
							</>
						</div>
					)
				)}
		</div>
	);
}
