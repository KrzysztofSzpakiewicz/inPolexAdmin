'use client';
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
	LocationsType,
	InputChangeEventType,
	SelectChangeEventType,
	NewUserType,
} from '@/app/dashboard/users/newUser/dataTypes';
import Cookies from 'js-cookie';
const token: string | undefined = Cookies.get('authToken');
export default function NewUser(): React.JSX.Element {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [userName, setUserName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false); // Nowy stan do pokazywania/ukrywania hasła
	const [verified, setVerified] = useState<boolean>(false);
	const [role, setRole] = useState<
		'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_COURIER'
	>('ROLE_USER');

	const [showMap, setShowMap] = useState<boolean>(false);
	const [locations, setLocations] = useState<LocationsType[]>([]);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editedAddress, setEditedAddress] = useState<string>('');

	const MapModal: React.ComponentType<{
		onClose: () => void;
		onConfirm: (locations: LocationsType[]) => void;
		initialLocations?: LocationsType[] | undefined;
	}> = dynamic(() => import('./components/MapModal'), {
		ssr: false,
	});

	const handlePhoneNumberChange: (e: InputChangeEventType) => void = (
		e: InputChangeEventType
	) => {
		const value: string = e.target.value;
		if (/^\d*$/.test(value)) {
			setPhoneNumber(value);
		}
	};

	const startEditing: (index: number) => void = (index: number) => {
		setEditingIndex(index);
		setEditedAddress(locations[index].address);
	};

	const saveEditedAddress: (index: number) => void = (index: number) => {
		setLocations((prev: LocationsType[]) =>
			prev.map((loc: LocationsType, i: number) =>
				i === index ? { ...loc, address: editedAddress } : loc
			)
		);
		setEditingIndex(null);
		setEditedAddress('');
	};

	const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		try {
			const newUserData: NewUserType = {
				firstName: firstName,
				lastName: lastName,
				userName: userName,
				email: email,
				password: password,
				phoneNumber: phoneNumber,
				verified: verified,
				role: role,
			};

			const response: Response = await fetch('/api/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`, // Dodanie Bearer Token do nagłówków
				},
				body: JSON.stringify(newUserData),
			});

			if (response.status === 200) {
			} else {
				alert('blad');
				console.log('Błąd dodawania:', response.status);
			}
		} catch (err) {
			alert('blad');
			console.log('Błąd podczas logowania:', err);
		}
	};

	return (
		<div className='p-4'>
			<h2 className='font-montserrat text-light mb-4 text-xl font-bold'>
				CREATE NEW USER
			</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='font-montserrat text-light block'>
						First Name:
					</label>
					<input
						type='text'
						value={firstName}
						onChange={(e: InputChangeEventType) =>
							setFirstName(e.target.value)
						}
						className='text-light placeholder-light w-full rounded border border-gray-300 px-3 py-2'
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
						onChange={(e: InputChangeEventType) =>
							setLastName(e.target.value)
						}
						className='text-light placeholder-light w-full rounded border border-gray-300 px-3 py-2'
						placeholder='Enter last name'
						required
					/>
				</div>
				<div>
					<label className='font-montserrat text-light block'>
						User Name:
					</label>
					<input
						type='text'
						value={userName}
						onChange={(e: InputChangeEventType) =>
							setUserName(e.target.value)
						}
						className='text-light placeholder-light w-full rounded border border-gray-300 px-3 py-2'
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
						className='text-light placeholder-light w-full rounded border border-gray-300 px-3 py-2'
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
						onChange={(e: InputChangeEventType) =>
							setEmail(e.target.value)
						}
						className='text-light placeholder-light w-full rounded border border-gray-300 px-3 py-2'
						placeholder='Enter email'
						required
					/>
				</div>

				<div>
					<label className='font-montserrat text-light block'>
						Password:
					</label>
					<div className='relative'>
						<input
							type={showPassword ? 'text' : 'password'} // Przełączanie typu inputu
							value={password}
							onChange={(e: InputChangeEventType) =>
								setPassword(e.target.value)
							}
							className='text-light placeholder-light w-full rounded border border-gray-300 px-3 py-2'
							placeholder='Enter password'
							required
						/>
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute top-1/2 right-2 -translate-y-1/2 text-gray-500'
						>
							{showPassword ? (
								<svg
									className='h-5 w-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
									/>
								</svg>
							) : (
								<svg
									className='h-5 w-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				<div>
					<label className='font-montserrat text-light block'>
						Verified:
					</label>
					<select
						value={verified.toString()}
						onChange={(e: SelectChangeEventType) =>
							setVerified(e.target.value === 'true')
						}
						className='text-light placeholder-light w-full rounded border border-gray-300 px-3 py-2'
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
						onChange={(e: SelectChangeEventType) =>
							setRole(
								e.target.value as
									| 'ROLE_ADMIN'
									| 'ROLE_USER'
									| 'ROLE_COURIER'
							)
						}
						className='text-light placeholder-light w-full rounded border border-gray-300 px-3 py-2'
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
						{locations.map((loc: LocationsType, index: number) => (
							<li
								key={index}
								className='flex items-center space-x-2 text-black'
							>
								{editingIndex === index ? (
									<>
										<input
											type='text'
											value={editedAddress}
											onChange={(
												e: InputChangeEventType
											) =>
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
					onConfirm={(selectedLocations: LocationsType[]) => {
						setLocations(selectedLocations);
						setShowMap(false);
					}}
					initialLocations={locations}
				/>
			)}
		</div>
	);
}
