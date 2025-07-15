'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { NewUserType, SelectChangeEventType } from './dataTypes';
import Cookies from 'js-cookie';
const token: string | undefined = Cookies.get('authToken');
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import UserAddresses from '@/components/AddressModals';
import { Address } from '@/components/Addresses/dataTypes';
import Image from 'next/image';
import InputComponent from '@/components/NewInput';

export default function NewUser(): React.JSX.Element {
	const router: AppRouterInstance = useRouter();
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [userName, setUserName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [verified, setVerified] = useState<boolean>(false);
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
			const newUserData: NewUserType & { address: Address[] } = {
				firstName,
				lastName,
				userName,
				email,
				password,
				phoneNumber: Number(phoneNumber), // Convert phoneNumber to number
				verified,
				role,
				address: userAddresses,
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
		<div className=''>
			<div className='flex items-center justify-between'>
				<button
					className='flex items-center font-bold transition hover:scale-105'
					onClick={() => router.back()}
				>
					<Image
						alt='arrowBack'
						src='/arrows/arrowBack.svg'
						width={32}
						height={32}
					/>
					GO BACK
				</button>
				<div className='flex gap-4'>
					<button
						className='bg-red rounded-xl px-4 py-2 font-bold hover:bg-red-600'
						onClick={handleCancel}
					>
						CANCEL
					</button>
					<button
						className='bg-green rounded-xl px-4 py-2 font-bold hover:bg-green-600'
						type='submit'
						form='userDataForm'
					>
						CREATE
					</button>
				</div>
			</div>
			<div className='flex items-center gap-4'>
				<Image
					alt='userIcon'
					src='/userIcon.svg'
					width={64}
					height={64}
				/>
				<p className='text-3xl font-bold'>CREATE NEW USER</p>
			</div>
			<div className='flex gap-4'>
				<form
					onSubmit={handleSubmit}
					className='flex w-1/2 flex-col gap-4 p-4'
					id='userDataForm'
				>
					<div className='flex items-center gap-4 text-xl font-bold'>
						<Image
							alt='userIcon'
							src='/infoIcon.svg'
							width={24}
							height={24}
						/>
						USER INFO:
					</div>
					<InputComponent
						value={firstName}
						onChange={setFirstName}
						placeholder='First name'
						required
					/>
					<InputComponent
						value={lastName}
						onChange={setLastName}
						placeholder='Last name'
						required
					/>
					<InputComponent
						value={userName}
						onChange={setUserName}
						placeholder='User name'
						required
					/>
					<InputComponent
						value={phoneNumber}
						onChange={(
							val: string | ((prevState: string) => string)
						) => {
							const sanitized: string = String(val)
								.replace(/\D/g, '')
								.slice(0, 9);
							setPhoneNumber(sanitized);
						}}
						placeholder='Phone number'
						required
					/>
					<InputComponent
						value={email}
						onChange={setEmail}
						placeholder='Email'
						required
					/>
					<InputComponent
						value={password}
						onChange={setPassword}
						placeholder='Password'
						required
						isPassword
					/>

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
								className='text-light w-64 appearance-none border-b-2 bg-transparent px-2 py-1 focus:outline-none'
							>
								<option className='bg-navyLight' value='true'>
									True
								</option>
								<option className='bg-navyLight' value='false'>
									False
								</option>
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
								className='text-light w-64 appearance-none border-b-2 bg-transparent px-2 py-1 focus:outline-none'
							>
								<option
									className='bg-navyLight'
									value='ROLE_ADMIN'
								>
									ADMIN
								</option>
								<option
									className='bg-navyLight'
									value='ROLE_USER'
								>
									USER
								</option>
								<option
									className='bg-navyLight'
									value='ROLE_COURIER'
								>
									COURIER
								</option>
							</select>
							<span className='bg-red absolute bottom-0 left-0 h-0.5 w-0 rounded transition-all duration-300 group-focus-within:w-full'></span>
						</div>
					</div>
				</form>

				<div className='w-1/2 p-4'>
					<div className='flex items-center gap-4 text-xl font-bold'>
						<Image
							alt='locationIcon'
							src='/locationIcon.svg'
							width={24}
							height={24}
						/>
						USER ADDRESSES:
					</div>
					<div className='scrollba overflow-y-auto'>
						<UserAddresses
							addresses={userAddresses}
							onAddressesChange={setUserAddresses}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
