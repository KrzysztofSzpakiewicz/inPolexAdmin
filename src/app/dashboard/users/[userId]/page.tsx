'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import {
	ReadonlyURLSearchParams,
	useSearchParams,
	useRouter,
} from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
	AddressType,
	ModifableUserDataType,
	NotModifiedUserDataType,
	UserFromServerType,
} from './dataTypes';
import Address from './components/Address';

const token: string | undefined = Cookies.get('authToken');

export default function User(): React.JSX.Element {
	const [userData, setUserData] = React.useState<UserFromServerType | null>(
		null
	);

	const [notModifableData, setNotModifableData] =
		React.useState<NotModifiedUserDataType | null>(null);

	const [modifableData, setModifableData] =
		React.useState<ModifableUserDataType | null>(null);

	const [isEditing, setIsEditing] = React.useState<boolean>(false);

	const [loading, setLoading] = React.useState<boolean>(true);

	const searchParams: ReadonlyURLSearchParams = useSearchParams();
	const router: AppRouterInstance = useRouter(); // Added useRouter hook
	const paramId: string | null = searchParams.get('id');

	useEffect(() => {
		const fetchUserData: () => Promise<void> = async (): Promise<void> => {
			try {
				if (!paramId) {
					setLoading(false);
					return;
				}

				const response: Response = await fetch(
					`/api/user/${paramId}/full`,
					{
						method: 'GET',
						headers: {
							Accept: '*/*',
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data: UserFromServerType = await response.json();
				setUserData(data);
				const { id, userName, email, ...rest } = data;

				setNotModifableData({ id, userName, email });

				setModifableData(rest);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching user data:', err);
				setLoading(false);
			}
		};

		fetchUserData();
	}, [paramId]);

	const deleteUser: () => Promise<void> = async (): Promise<void> => {
		try {
			const response: Response = await fetch(`/api/user/${paramId}`, {
				method: 'DELETE',
				headers: {
					Accept: '*/*',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			if (response.status === 200) {
				console.log('User deleted successfully');
				router.push('/dashboard');
			} else {
				console.log('error', response);
			}
		} catch (err) {
			console.log('error', err);
		}
	};

	const handleDeleteClick: () => void = (): void => {
		if (
			userData &&
			window.confirm(
				`Are you sure you want to delete user ${userData.firstName} ${userData.lastName}? This action cannot be undone.`
			)
		) {
			deleteUser();
		}
	};

	const labels: {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		verified: string;
		role: string;
	} = {
		firstName: 'FIRST NAME',
		lastName: 'LAST NAME',
		phoneNumber: 'PHONE NUMBER',
		verified: 'VERIFIED',
		role: 'ROLE',
	};

	const handleUserFieldChange: (
		key: keyof ModifableUserDataType,
		value: string | number | boolean
	) => void = (
		key: keyof ModifableUserDataType,
		value: string | number | boolean
	): void => {
		setModifableData((prev: ModifableUserDataType | null) =>
			prev ? { ...prev, [key]: value } : prev
		);
	};

	const handleUserAddressChange: (
		index: number,
		key: keyof AddressType,
		value: string | number
	) => void = (
		index: number,
		key: keyof AddressType,
		value: string | number
	): void => {
		setModifableData((prevUserData: ModifableUserDataType | null) => {
			if (!prevUserData) return null;
			return {
				...prevUserData,
				address: prevUserData.address.map(
					(addr: AddressType, i: number) =>
						i === index ? { ...addr, [key]: value } : addr
				),
			};
		});
	};

	return (
		<div className='relative flex h-full w-full flex-col gap-4'>
			{loading && <p>Loading...</p>}
			{userData && modifableData && (
				<>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<Image
								alt='userIcon'
								src='/userIcon.svg'
								width={64}
								height={64}
							/>
							<p className='text-4xl font-bold'>
								{modifableData.firstName}{' '}
								{modifableData.lastName}
							</p>
						</div>
						<div className='flex gap-4'>
							<button
								className='bg-red text-light rounded-md px-4 py-2 font-bold'
								onClick={handleDeleteClick}
							>
								DELETE
							</button>
							<button
								className='text-light rounded-md bg-blue-500 px-4 py-2 font-bold'
								onClick={() => setIsEditing(!isEditing)}
							>
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
							<table className='text-sm'>
								<tbody>
									<tr>
										<td className='w-40 py-0.5'>ID:</td>
										<td className='py-0.5'>
											{notModifableData?.id}
										</td>
									</tr>
									<tr>
										<td className='max-w-32 py-0.5'>
											USER NAME:
										</td>
										<td className='py-0.5'>
											{notModifableData?.userName}
										</td>
									</tr>
									<tr>
										<td className='max-w-32 py-0.5'>
											EMAIL:
										</td>
										<td className='py-0.5'>
											{notModifableData?.email}
										</td>
									</tr>
									{modifableData &&
										(
											Object.keys(labels) as Array<
												keyof typeof labels
											>
										).map((key: keyof typeof labels) => (
											<tr key={key} className='h-6'>
												<td className='h-full max-w-32 py-0.5'>
													{labels[key]}:
												</td>
												<td className='flex h-full items-center justify-between py-0.5'>
													<input
														type={
															key === 'verified'
																? 'checkbox'
																: key ===
																	  'phoneNumber'
																	? 'number'
																	: 'text'
														}
														checked={
															key === 'verified'
																? modifableData[
																		key
																	]
																: undefined
														}
														value={
															key !== 'verified'
																? modifableData[
																		key
																	]
																: undefined
														}
														disabled={!isEditing}
														className={`${key === 'verified' ? 'w-auto' : 'w-full'} h-6 py-0.5`}
														onChange={(
															e: React.ChangeEvent<HTMLInputElement>
														) =>
															handleUserFieldChange(
																key,
																key ===
																	'verified'
																	? e.target
																			.checked
																	: key ===
																		  'phoneNumber'
																		? Number(
																				e
																					.target
																					.value
																			)
																		: e
																				.target
																				.value
															)
														}
													/>
													{isEditing && (
														<Image
															alt='editIcon'
															src='/editIcon.svg'
															width={24}
															height={24}
														/>
													)}
												</td>
											</tr>
										))}
								</tbody>
							</table>
							<div className='flex items-center gap-4 text-xl font-bold'>
								<Image
									alt='locationIcon'
									src='/locationIcon.svg'
									width={24}
									height={24}
								/>
								USER ADDRESSES:
							</div>
							{modifableData.address.length != 0 ? (
								<Address
									address={modifableData.address}
									onAddressChange={handleUserAddressChange}
									editable={isEditing}
								/>
							) : (
								<div className='border-red text-red w-full rounded-2xl border-2 p-4 text-center text-2xl font-bold'>
									USER HAS NO ADDRESSES
								</div>
							)}
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
								{/* Rest of your shipments code */}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
