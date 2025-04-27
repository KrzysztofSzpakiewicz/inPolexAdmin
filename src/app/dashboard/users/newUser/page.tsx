'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';

import {
	InputChangeEventType,
	NewUserType,
	SelectChangeEventType,
} from './dataTypes';
import Cookies from 'js-cookie';
const token: string | undefined = Cookies.get('authToken');
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import UserAddresses from '@/components/AddressModals';
import { Address } from '@/components/Addresses/dataTypes';

export default function NewUser(): React.JSX.Element {
	const router: AppRouterInstance = useRouter();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [verified, setVerified] = useState(false);
	const [role, setRole] = useState<
		'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_COURIER'
	>('ROLE_USER');

	// Lifted address state
	const [userAddresses, setUserAddresses] = useState<Address[]>([]);

	const handleCancel: () => void = () => router.push('/dashboard/users');

	const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		try {
			const newUserData: NewUserType & { addresses: Address[] } = {
				firstName,
				lastName,
				userName,
				email,
				password,
				phoneNumber,
				verified,
				role,
				addresses: userAddresses,
			};
			const response: Response = await fetch('/api/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newUserData),
			});
			if (response.status === 200) {
				router.push('/dashboard/users');
			} else {
				alert('blad');
				console.log('Błąd dodawania:', response.status);
			}
		} catch (error) {
			console.error('Error creating user:', error);
		}
	};

	return (
		<div className='p-4'>
			<div className='mb-4 flex flex-row justify-between'>
				<h2 className='font-montserrat text-light mb-4 text-xl font-bold'>
					CREATE NEW USER
				</h2>
				<div className='flex gap-2'>
					<button
						className='rounded-xl bg-red-600 px-4 py-2 font-bold'
						onClick={handleCancel}
					>
						CANCEL
					</button>
					<button
						className='rounded-xl bg-green-600 px-4 py-2 font-bold'
						type='submit'
						form='userDataForm'
					>
						CREATE
					</button>
				</div>
			</div>
			<div className='flex gap-4'>
				<form
					onSubmit={handleSubmit}
					className='flex w-1/2 flex-col gap-4 p-4'
					id='userDataForm'
				>
					<Input
						type='text'
						value={firstName}
						placeholder='First name'
						onChange={(value: string) => setFirstName(value)}
					/>
					<Input
						type='text'
						value={lastName}
						placeholder='Last name'
						onChange={(value: string) => setLastName(value)}
					/>
					<Input
						type='text'
						value={userName}
						placeholder='User name'
						onChange={(value: string) => setUserName(value)}
					/>
					<Input
						type='number'
						value={phoneNumber}
						placeholder='Phone number'
						onChange={(value: string) => setPhoneNumber(value)}
					/>
					<Input
						type='email'
						value={email}
						placeholder='Email'
						onChange={(value: string) => setEmail(value)}
					/>
					<div className='flex items-center gap-4'>
						<label className='font-montserrat text-light mb-0 w-40'>
							Password:
						</label>
						<div className='group relative w-64'>
							<input
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e: InputChangeEventType) =>
									setPassword(e.target.value)
								}
								className='text-light w-64 border-b-2 bg-transparent px-2 py-1 pr-8 placeholder-neutral-400 focus:outline-none'
								placeholder='Password...'
								required
							/>
							<span className='bg-red absolute bottom-0 left-0 h-0.5 w-0 rounded transition-all duration-300 group-focus-within:w-full'></span>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute top-1/2 right-2 -translate-y-1/2 text-gray-500'
							>
								{/* icons omitted */}
							</button>
						</div>
					</div>
					<div className='flex items-center gap-4'>
						<label className='font-montserrat text-light mb-0 w-40'>
							Verified:
						</label>
						<div className='group relative w-64'>
							<select
								value={verified.toString()}
								onChange={(e: SelectChangeEventType) =>
									setVerified(e.target.value === 'true')
								}
								className='text-light w-full appearance-none border-b-2 bg-transparent px-2 py-1 focus:outline-none'
							>
								<option value='true'>True</option>
								<option value='false'>False</option>
							</select>
							<span className='bg-red absolute bottom-0 left-0 h-0.5 w-0 rounded transition-all duration-300 group-focus-within:w-full'></span>
						</div>
					</div>
					<div className='flex items-center gap-4'>
						<label className='font-montserrat text-light mb-0 w-40'>
							Role:
						</label>
						<div className='group relative w-64'>
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
								className='text-light w-full appearance-none border-b-2 bg-transparent px-2 py-1 focus:outline-none'
							>
								<option value='ROLE_ADMIN'>ADMIN</option>
								<option value='ROLE_USER'>USER</option>
								<option value='ROLE_COURIER'>COURIER</option>
							</select>
							<span className='bg-red absolute bottom-0 left-0 h-0.5 w-0 rounded transition-all duration-300 group-focus-within:w-full'></span>
						</div>
					</div>
				</form>

				<div className='w-1/2'>
					<UserAddresses
						addresses={userAddresses}
						onAddressesChange={setUserAddresses}
					/>
				</div>
			</div>
		</div>
	);
}
