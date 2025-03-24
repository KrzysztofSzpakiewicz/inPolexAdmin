'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { UserType } from '@/dto';
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const token: string | undefined = Cookies.get('authToken');

export default function NewUser(): React.JSX.Element {
	const router = useRouter();
	const [autoIncrement, setAutoIncrement] = useState<boolean>(true);
	const [id, setId] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [verified, setVerified] = useState<boolean>(false);
	const [role, setRole] = useState<
		'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_COURIER'
	>('ROLE_USER');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [showMap, setShowMap] = useState<boolean>(false);
	const [locations, setLocations] = useState<
		{ lat: number; lng: number; address: string }[]
	>([]);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editedAddress, setEditedAddress] = useState<string>('');

	const MapModal = dynamic(() => import('./components/MapModal'), {
		ssr: false,
	});

	const handlePhoneNumberChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) {
			setPhoneNumber(value);
		}
	};

	const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) {
			setId(value);
		}
	};

	const startEditing = (index: number) => {
		setEditingIndex(index);
		setEditedAddress(locations[index].address);
	};

	const saveEditedAddress = (index: number) => {
		setLocations((prev) =>
			prev.map((loc, i) =>
				i === index ? { ...loc, address: editedAddress } : loc
			)
		);
		setEditingIndex(null);
		setEditedAddress('');
	};

	const handleSubmit = () => {};

	return (
		<div className='p-4'>
			<h2 className='font-montserrat text-light mb-4 text-xl font-bold'>
				Create New User
			</h2>

			{loading && <p>Loading...</p>}
			{error && <p className='text-red-500'>{error}</p>}

			<form onSubmit={handleSubmit} className='space-y-4'>
				{/* Existing form fields remain unchanged */}
				<div>
					<label className='flex items-center space-x-2'>
						<input
							type='checkbox'
							checked={autoIncrement}
							onChange={(e) => setAutoIncrement(e.target.checked)}
							className='form-checkbox'
						/>
						<span className='font-montserrat text-light'>
							Auto Increment ID
						</span>
					</label>
					{!autoIncrement && (
						<div className='mt-2'>
							<label className='font-montserrat text-light block'>
								ID:
							</label>
							<input
								type='text'
								value={id}
								onChange={handleIdChange}
								className='w-full rounded border border-gray-300 px-3 py-2 text-black'
								placeholder='Enter ID (numbers only)'
								required={!autoIncrement}
							/>
						</div>
					)}
				</div>

				<div>
					<label className='font-montserrat text-light block'>
						First Name:
					</label>
					<input
						type='text'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className='w-full rounded border border-gray-300 px-3 py-2 text-black'
						placeholder='Enter first name'
						required
					/>
				</div>

				<div>
					<label className='font-montserrat text-light block'>
						Last Name:
					</label>
					<input
						type='text'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className='w-full rounded border border-gray-300 px-3 py-2 text-black'
						placeholder='Enter last name'
						required
					/>
				</div>

				<div>
					<label className='font-montserrat text-light block'>
						Phone Number:
					</label>
					<input
						type='text'
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
						className='w-full rounded border border-gray-300 px-3 py-2 text-black'
						placeholder='Enter phone number (numbers only)'
						required
					/>
				</div>

				<div>
					<label className='font-montserrat text-light block'>
						Email:
					</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='w-full rounded border border-gray-300 px-3 py-2 text-black'
						placeholder='Enter email'
						required
					/>
				</div>

				<div>
					<label className='font-montserrat text-light block'>
						Verified:
					</label>
					<select
						value={verified.toString()}
						onChange={(e) => setVerified(e.target.value === 'true')}
						className='w-full rounded border border-gray-300 px-3 py-2 text-black'
					>
						<option value='true'>True</option>
						<option value='false'>False</option>
					</select>
				</div>

				<div>
					<label className='font-montserrat text-light block'>
						Role:
					</label>
					<select
						value={role}
						onChange={(e) =>
							setRole(
								e.target.value as
									| 'ROLE_ADMIN'
									| 'ROLE_USER'
									| 'ROLE_COURIER'
							)
						}
						className='w-full rounded border border-gray-300 px-3 py-2 text-black'
					>
						<option value='ROLE_ADMIN'>ROLE_ADMIN</option>
						<option value='ROLE_USER'>ROLE_USER</option>
						<option value='ROLE_COURIER'>ROLE_COURIER</option>
					</select>
				</div>

				<div>
					<label className='font-montserrat text-light block'>
						Locations:
					</label>
					<button
						type='button'
						onClick={() => setShowMap(true)}
						className='rounded bg-blue-500 px-4 py-2 text-white'
					>
						Select Locations on Map
					</button>
					<ul className='mt-2 space-y-2'>
						{locations.map((loc, index) => (
							<li
								key={index}
								className='flex items-center space-x-2 text-black'
							>
								{editingIndex === index ? (
									<>
										<input
											type='text'
											value={editedAddress}
											onChange={(e) =>
												setEditedAddress(e.target.value)
											}
											className='flex-grow rounded border border-gray-300 px-2 py-1 text-black'
										/>
										<button
											type='button'
											onClick={() =>
												saveEditedAddress(index)
											}
											className='rounded bg-green-500 px-2 py-1 text-white'
										>
											Save
										</button>
										<button
											type='button'
											onClick={() =>
												setEditingIndex(null)
											}
											className='rounded bg-gray-500 px-2 py-1 text-white'
										>
											Cancel
										</button>
									</>
								) : (
									<>
										<span className='flex-grow'>
											{loc.address} ({loc.lat.toFixed(6)},{' '}
											{loc.lng.toFixed(6)})
										</span>
										<button
											type='button'
											onClick={() => startEditing(index)}
											className='rounded bg-yellow-500 px-2 py-1 text-white'
										>
											Edit Address
										</button>
									</>
								)}
							</li>
						))}
					</ul>
				</div>

				<div className='flex space-x-4'>
					<button
						type='submit'
						className='bg-red px-4 py-2 text-white'
					>
						Create User
					</button>
					<Link href='/dashboard/users'>
						<button
							type='button'
							className='bg-gray-500 px-4 py-2 text-white'
						>
							Cancel
						</button>
					</Link>
				</div>
			</form>
			{showMap && (
				<MapModal
					onClose={() => setShowMap(false)}
					onConfirm={(selectedLocations) => {
						setLocations(selectedLocations);
						setShowMap(false);
					}}
					initialLocations={locations} // Pass existing locations to MapModal
				/>
			)}
		</div>
	);
}
