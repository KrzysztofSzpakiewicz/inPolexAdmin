'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import {
	Address,
	AddressLabelType,
	AddressModalProps,
	MapModalProps,
	UserAddressesProps,
} from './Addresses/dataTypes';

const AddressModal: React.ComponentType<AddressModalProps> = dynamic(
	() => import('@/components/Addresses/AddressModal'),
	{ ssr: false }
);

const MapModal: React.ComponentType<MapModalProps> = dynamic(
	() => import('@/components/Addresses/MapModal'),
	{
		ssr: false,
		loading: () => (
			<div className='bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black'>
				<div className='mt-4 flex justify-center'>
					<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
				</div>
			</div>
		),
	}
);

const labels: AddressLabelType = {
	country: 'COUNTRY',
	city: 'CITY',
	street: 'STREET',
	number: 'STREET NUMBER',
	apartment: 'APARTMENT',
	postalCode: 'POSTAL CODE',
};

export default function UserAddresses({
	addresses,
	onAddressesChange,
}: UserAddressesProps): React.JSX.Element {
	const [selectedAddressIndex, setSelectedAddressIndex] = useState<
		number | null
	>(null);
	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
	const [isMapModalOpen, setIsMapModalOpen] = useState(false);
	const [tempAddress, setTempAddress] = useState<Address | undefined>(
		undefined
	);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const handleAddAddress: (e: React.MouseEvent<HTMLButtonElement>) => void = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		setSelectedAddressIndex(null);
		setIsAddressModalOpen(true);
	};

	const handleEditAddress: (index: number) => void = (index: number) => {
		setSelectedAddressIndex(index);
		setTempAddress(addresses[index]);
		setIsAddressModalOpen(true);
	};

	const handleDeleteAddress: (index: number) => void = (index: number) => {
		const updatedAddresses: Address[] = [...addresses];
		updatedAddresses.splice(index, 1);
		onAddressesChange(updatedAddresses);
	};

	const handleSaveAddress: (address: Address) => void = (
		address: Address
	) => {
		const updatedAddresses: Address[] = [...addresses];
		if (selectedAddressIndex !== null) {
			updatedAddresses[selectedAddressIndex] = address;
		} else {
			updatedAddresses.push(address);
		}
		onAddressesChange(updatedAddresses);
		setTempAddress(undefined);
		setIsAddressModalOpen(false);
	};

	const handleSelectFromMap: (address: Address) => void = (
		address: Address
	) => {
		console.log('To dostaje adres z mapy', address);

		setTempAddress(address);
		setIsMapModalOpen(true);
		setIsAddressModalOpen(false);
	};

	const handleMapSelect: (address: Address) => void = (address: Address) => {
		setTempAddress(address);
		setIsMapModalOpen(false);
		setIsAddressModalOpen(true);
	};

	const handleMapCancel: () => void = () => {
		setTempAddress(undefined);
		setIsMapModalOpen(false);
		setIsAddressModalOpen(true);
	};

	return (
		<div className='flex w-full flex-col items-start gap-4 p-4'>
			{addresses.map((address: Address, index: number) => {
				const isHovered: boolean = hoveredIndex === index;
				return (
					<div
						key={index}
						className='relative flex w-full overflow-hidden'
						onMouseEnter={() => setHoveredIndex(index)}
						onMouseLeave={() => setHoveredIndex(null)}
					>
						<div
							className={`border-red grid cursor-pointer grid-cols-2 gap-2 rounded-xl border-4 p-2 transition-all duration-300 ${
								isHovered ? 'w-5/6' : 'w-full'
							}`}
							onClick={() => handleEditAddress(index)}
						>
							{(
								Object.keys(labels) as Array<
									keyof AddressLabelType
								>
							).map((key: keyof AddressLabelType) => (
								<div className='flex flex-col' key={key}>
									<p className='font-bold'>{labels[key]}</p>
									<div className='flex items-center justify-between'>
										<p>{address[key]}</p>
									</div>
								</div>
							))}
						</div>
						<div
							className={` ${
								isHovered
									? 'ml-4 w-1/6 translate-x-0'
									: 'ml-0 w-0 translate-x-full'
							} bg-red flex transform cursor-pointer items-center justify-center overflow-hidden rounded-xl transition-all duration-300`}
							onClick={() => handleDeleteAddress(index)}
						>
							<Image
								width={40}
								height={40}
								alt='deleteIcon'
								src='/deleteIcon.svg'
							/>
						</div>
					</div>
				);
			})}
			<button
				className='border-red w-full rounded-xl border-4 border-dashed p-4 font-bold transition hover:scale-102'
				onClick={handleAddAddress}
			>
				ADD NEW ADDRESS
			</button>
			{isMapModalOpen && (
				<MapModal
					initialAddress={tempAddress}
					onAccept={handleMapSelect}
					onCancel={handleMapCancel}
				/>
			)}

			{isAddressModalOpen && (
				<AddressModal
					initialAddress={
						tempAddress !== undefined
							? tempAddress
							: selectedAddressIndex !== null
								? addresses[selectedAddressIndex]
								: undefined
					}
					onSave={handleSaveAddress}
					onCancel={() => setIsAddressModalOpen(false)}
					onSelectMap={handleSelectFromMap}
				/>
			)}
		</div>
	);
}
