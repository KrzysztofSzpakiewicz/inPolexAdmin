'use client';
import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Image from 'next/image';
import { Address, AddressModalProps } from './dataTypes';

export default function AddressModal({
	initialAddress,
	onSave,
	onCancel,
	onSelectMap,
}: AddressModalProps): React.JSX.Element {
	const [address, setAddress] = useState<Address>(
		initialAddress || {
			country: '',
			city: '',
			street: '',
			number: '',
			apartment: '',
			postalCode: '',
		}
	);

	useEffect(() => {
		if (initialAddress) {
			setAddress(initialAddress);
		}
	}, [initialAddress]);

	useEffect(() => {
		if (initialAddress) {
			setAddress(initialAddress);
		} else {
			setAddress({
				country: '',
				city: '',
				street: '',
				number: '',
				apartment: '',
				postalCode: '',
			});
		}
	}, [initialAddress]);

	const handleChange: (field: keyof Address, value: string) => void = (
		field: keyof Address,
		value: string
	) => {
		setAddress({ ...address, [field]: value });
	};

	const handleOnSelectMap: () => void = () => {
		if (
			address.country.trim() === '' ||
			address.city.trim() === '' ||
			address.street.trim() === '' ||
			address.number.trim() === '' ||
			address.postalCode.trim() === ''
		) {
			onSelectMap(address);
		} else {
			const fetchLatLng: () => Promise<void> = async () => {
				try {
					const response: Response = await fetch(
						`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
							`${address.street} ${address.number}, ${address.city}, ${address.postalCode}, ${address.country}`
						)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
					);
					const data: {
						status: string;
						results: {
							geometry: {
								location: { lat: number; lng: number };
							};
						}[];
					} = await response.json();

					if (data.status === 'OK' && data.results.length > 0) {
						const location: { lat: number; lng: number } =
							data.results[0].geometry.location;
						const updatedAddress: Address = {
							...address,
							latitude: location.lat,
							longitude: location.lng,
						};
						setAddress(updatedAddress);
						onSelectMap(updatedAddress);
					} else {
						console.error(
							'No results found for the given address.'
						);
					}
				} catch {
					console.error(
						'Error fetching location data from Google Maps API.'
					);
				}
			};

			fetchLatLng();
		}
	};

	return (
		<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
			<div className='bg-lightGray flex flex-col gap-8 rounded-lg p-8 shadow-lg'>
				<h2 className='text-light mb-4 text-center text-xl font-semibold'>
					{initialAddress ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}
				</h2>

				<div
					className='group relative w-auto cursor-pointer overflow-hidden rounded-xl bg-slate-700 p-2 text-center font-semibold transition-all'
					onClick={handleOnSelectMap}
				>
					<div className='absolute inset-0 z-0 origin-center scale-0 rounded-full bg-slate-800 transition-all duration-[2000ms] ease-out group-hover:scale-[5]'></div>

					<div className='relative z-10 flex items-center justify-center text-white'>
						<Image
							src='/locationIcon.svg'
							alt='map'
							width={32}
							height={32}
							className='mr-2 inline-block'
						/>
						CHOOSE FROM MAP
					</div>
				</div>
				<form
					className='flex flex-col gap-4'
					onSubmit={() => onSave(address)}
					id='addressForm'
				>
					<Input
						value={address.country}
						placeholder={'Country'}
						type={'text'}
						onChange={(value: string) =>
							handleChange('country', value)
						}
					/>
					<Input
						value={address.city}
						placeholder={'City'}
						type={'text'}
						onChange={(value: string) =>
							handleChange('city', value)
						}
					/>
					<Input
						value={address.street}
						placeholder={'Street'}
						type={'text'}
						onChange={(value: string) =>
							handleChange('street', value)
						}
					/>
					<Input
						value={address.number}
						placeholder={'Street Number'}
						type={'text'}
						onChange={(value: string) =>
							handleChange('number', value)
						}
					/>
					<Input
						value={address.apartment}
						placeholder={'Apartment'}
						type={'text'}
						onChange={(value: string) =>
							handleChange('apartment', value)
						}
					/>
					<Input
						value={address.postalCode}
						placeholder={'Postal Code'}
						type={'text'}
						onChange={(value: string) =>
							handleChange('postalCode', value)
						}
					/>
				</form>

				<div className='flex flex-row items-center justify-center gap-4'>
					<button
						className='bg-red rounded px-4 py-2 font-bold text-white transition hover:bg-red-600'
						onClick={onCancel}
					>
						CANCEL
					</button>
					<button
						className='bg-green rounded px-4 py-2 font-bold text-white transition hover:bg-green-600'
						type='submit'
						form='addressForm'
					>
						SAVE
					</button>
				</div>
			</div>
		</div>
	);
}
