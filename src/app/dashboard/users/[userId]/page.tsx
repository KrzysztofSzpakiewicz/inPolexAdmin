/* eslint-disable indent */
'use client';

import Image from 'next/image';
import React from 'react';
import Address from './components/Address';

interface AddressType {
	id: number;
	country: string;
	city: string;
	street: string;
	number: number;
	postalCode: string;
}

interface UserPackages {
	shipmentId: number;
	name: string;
	type: 'Incoming' | 'Outgoing';
	status: string;
}
interface UserType {
	id: number;
	name: string;
	email: string;
	accountType: 'standard' | 'courier';
	addresses: AddressType[];
	packages: UserPackages[];
}

const userData: UserType = {
	id: 1,
	name: 'Jan Kowalski',
	email: 'jessicka.pawlowska@gmail.com',
	accountType: 'standard',
	addresses: [
		{
			id: 1,
			country: 'Poland',
			city: 'Warsaw',
			street: 'Marszałkowska',
			number: 1,
			postalCode: '00-000',
		},
		{
			id: 2,
			country: 'Poland',
			city: 'Warsaw',
			street: 'Marszałkowska',
			number: 1,
			postalCode: '00-000',
		},
	],
	packages: [
		{
			shipmentId: 2138431231,
			name: 'Potężne dildo',
			type: 'Outgoing',
			status: 'Transferring',
		},
		{
			shipmentId: 2648124545,
			name: 'Potężne dildo',
			type: 'Incoming',
			status: 'Delivered',
		},
		{
			shipmentId: 9517273521,
			name: 'Potężne dildo',
			type: 'Incoming',
			status: 'New',
		},
	],
};

const shipmentsTypes: string[] = [
	'All',
	'New',
	'Waiting for',
	'Transferring',
	'On The Way',
	'Delivered',
	'Cancelled',
];

export default function User(): React.JSX.Element {
	/* FETCH DATA FROM SERVER */

	const [sortBy, setSortBy] = React.useState<string>('All');

	const filteredShipments: UserPackages[] =
		sortBy === 'All'
			? userData.packages
			: userData.packages.filter(
					(shipment: UserPackages) => shipment.status === sortBy
				);

	return (
		<div className='flex h-full w-full flex-col gap-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<Image
						alt='userIcon'
						src='/userIcon.svg'
						width={64}
						height={64}
					/>
					<p className='text-[32px] font-bold'>{userData.name}</p>
				</div>
				<div className='flex gap-4'>
					<button className='bg-red text-light rounded-md px-4 py-2 font-bold'>
						DELETE
					</button>
					<button className='text-light rounded-md bg-blue-500 px-4 py-2 font-bold'>
						EDIT
					</button>
				</div>
			</div>
			<div className='flex justify-between'>
				<div className='flex w-2/5 flex-col gap-4'>
					<div className='flex items-center gap-4 text-xl font-bold'>
						<Image
							alt='userIcon'
							src='/infoIcon.svg'
							width={24}
							height={24}
						/>
						USER INFO:
					</div>
					{/* DYNAMICZNIE SIĘ GENERUJĄCA MAPA Z DANYMI USERA */}
					DODANIE DYNAMICZNEGO ŁADOWANIA
					{/* <table className='text-sm'>
						<tr>
							<td>USER ID:</td>
							<td>{userData.id}</td>
						</tr>
					</table> */}
					<div className='flex items-center gap-4 text-xl font-bold'>
						<Image
							alt='locationIcon'
							src='/locationIcon.svg'
							width={24}
							height={24}
						/>
						USER ADDRESSES:
					</div>
					{userData.addresses.map((address: AddressType) => (
						<Address key={address.id} address={address} />
					))}
				</div>
				<div className='flex w-2/5 flex-col gap-4'>
					<div className='flex items-center gap-4 text-xl font-bold'>
						<Image
							alt='locationIcon'
							src='/package-icon.svg'
							width={24}
							height={24}
						/>
						SHIPMENTS:
					</div>
					<div className='flex flex-wrap gap-2'>
						{shipmentsTypes.map((type: string) => (
							<div
								key={type}
								className={`bg-navyLight cursor-pointer rounded px-2 py-1 text-sm ${
									sortBy === type
										? 'border-red border-2'
										: 'border-darkGray border-2'
								}`}
								onClick={() => setSortBy(type)}
							>
								{type}
							</div>
						))}
						<div className='flex w-full flex-col gap-2'>
							{filteredShipments.map((shipment: UserPackages) => (
								<div
									key={shipment.shipmentId}
									className='border-red flex gap-4 rounded-xl border-4 p-4'
								>
									{shipment.type === 'Incoming' ? (
										<Image
											alt='locationIcon'
											src='/packageReceivedIcon.svg'
											width={32}
											height={32}
										/>
									) : (
										<Image
											alt='locationIcon'
											src='/packageSentIcon.svg'
											width={32}
											height={32}
										/>
									)}
									<div className='flex gap-4'>
										<div className='flex flex-col gap-1'>
											<p className='font-bold'>Name:</p>
											<p className='font-bold'>Number:</p>
											<p className='font-bold'>Type:</p>
										</div>
										<div className='flex flex-col gap-1'>
											<p className='font-normal'>
												{shipment.name}
											</p>
											<p className='font-normal'>
												{shipment.shipmentId}
											</p>
											<p className='font-normal'>
												{shipment.type}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
