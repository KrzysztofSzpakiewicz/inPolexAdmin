import React from 'react';
import { EditUserModalPropsType, UserFromServerType } from '../dataTypes';
import UserAddresses from '@/components/AddressModals';
import { useState } from 'react';
import { Address } from '@/components/Addresses/dataTypes';
import Input from '@/components/Input';
import { SelectChangeEventType } from '../../newUser/dataTypes';

interface UserDetails {
	id: number;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	phoneNumber: string;
	role: string;
	verified: boolean;
}

export default function EditUserModal({
	userData,
	onClose,
	onUpdateUser,
}: EditUserModalPropsType): React.JSX.Element {
	const [addresses, setAddresses] = useState<Address[]>(userData.address);
	const [userDetails, setUserDetails] = useState<UserDetails>({
		id: userData.id,
		firstName: userData.firstName,
		lastName: userData.lastName,
		userName: userData.userName,
		email: userData.email,
		phoneNumber: userData.phoneNumber,
		role: userData.role,
		verified: userData.verified,
	});

	const handleUserDetailsChange: (
		field: keyof UserDetails,
		value: string | boolean
	) => void = (field: keyof UserDetails, value: string | boolean) => {
		setUserDetails((prevDetails: UserDetails) => ({
			...prevDetails,
			[field]: value,
		}));
	};

	const handlePress: () => void = () => {
		const updatedUserDetails: UserFromServerType = {
			...userDetails,
			address: addresses,
		};
		console.log('Updated user details:', updatedUserDetails);
		onUpdateUser(updatedUserDetails);
	};
	return (
		<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
			<div className='bg-lightGray flex w-2/3 flex-col gap-4 rounded-lg p-8 shadow-lg'>
				<h2 className='text-light text-center text-xl font-semibold'>
					Edit user {userData.firstName}, {userData.lastName}
				</h2>
				<div className='flex flex-row'>
					<form
						id='userDetailsForm'
						className='flex w-1/2 flex-col gap-2'
						onSubmit={handlePress}
					>
						<Input
							type='text'
							value={userDetails.firstName}
							placeholder='First Name'
							onChange={(val: string) =>
								handleUserDetailsChange('firstName', val)
							}
						/>
						<Input
							type='text'
							value={userDetails.lastName}
							placeholder='Last Name'
							onChange={(val: string) =>
								handleUserDetailsChange('lastName', val)
							}
						/>
						<Input
							type='text'
							value={userDetails.userName}
							placeholder='User Name'
							onChange={(val: string) =>
								handleUserDetailsChange('userName', val)
							}
						/>
						<div className='flex items-center gap-4'>
							<label className='font-montserrat text-light mb-0 w-40'>
								Verified:
							</label>
							<div className='group relative w-64'>
								<select
									value={userDetails.verified.toString()}
									onChange={(e: SelectChangeEventType) =>
										handleUserDetailsChange(
											'verified',
											e.target.value === 'true'
										)
									}
									className='text-light w-full appearance-none border-b-2 bg-transparent px-2 py-1 focus:outline-none'
								>
									<option
										className='bg-navyLight'
										value='true'
									>
										True
									</option>
									<option
										className='bg-navyLight'
										value='false'
									>
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
									value={userDetails.role}
									onChange={(e: SelectChangeEventType) =>
										handleUserDetailsChange(
											'role',
											e.target.value as
												| 'ROLE_ADMIN'
												| 'ROLE_USER'
												| 'ROLE_COURIER'
										)
									}
									className='text-light w-full appearance-none border-b-2 bg-transparent px-2 py-1 focus:outline-none'
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
					<div className='w-1/2'>
						<UserAddresses
							addresses={addresses}
							onAddressesChange={setAddresses}
						/>
					</div>
				</div>

				<div className='flex justify-center gap-4'>
					<button
						onClick={onClose}
						className='bg-red text-light rounded-md px-4 py-2 font-bold hover:bg-red-600'
					>
						CLOSE
					</button>
					<button
						className='text-light bg-green rounded-md px-4 py-2 font-bold hover:bg-green-600'
						type='submit'
						form='userDetailsForm'
					>
						SAVE CHANGES
					</button>
				</div>
			</div>
		</div>
	);
}
