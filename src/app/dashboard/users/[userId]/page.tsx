'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter, useParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AddressType, LabelAdresType, UserFromServerType } from './dataTypes';
import Address from './components/Address';
const token: string | undefined = Cookies.get('authToken');

export default function User(): React.JSX.Element {
	//STARE
	const [userData, setUserData] = React.useState<UserFromServerType | null>(
		null
	);

	const [isEditingModal, setIsEditingModal] = React.useState<boolean>(false);

	const [userDataCopy, setUserDataCopy] =
		React.useState<UserFromServerType | null>(null);

	const [loading, setLoading] = React.useState<boolean>(true);

	const [showDeleteModal, setShowDeleteModal] =
		React.useState<boolean>(false);

	const router: AppRouterInstance = useRouter(); // Added useRouter hook
	const { userId } = useParams();

	useEffect(() => {
		const fetchUserData: () => Promise<void> = async (): Promise<void> => {
			try {
				if (!userId) {
					setLoading(false);
					return;
				}

				const response: Response = await fetch(
					`/api/user/${userId}/full`,
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
				setUserDataCopy(data);

				setLoading(false);
			} catch (err) {
				console.error('Error fetching user data:', err);
				setLoading(false);
			}
		};

		fetchUserData();
	}, [userId]);

	const deleteUser: () => Promise<void> = async (): Promise<void> => {
		try {
			const response: Response = await fetch(
				`/api/user/${userData?.id}`,
				{
					method: 'DELETE',
					headers: {
						Accept: '*/*',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			if (response.status === 200) {
				router.push('/dashboard/users');
			} else {
				console.log('error', response);
			}
		} catch (err) {
			console.log('error', err);
		}
	};

	const handleDeleteClick: () => void = (): void => {
		setShowDeleteModal(true);
	};

	const cancelDeleteUser: () => void = (): void => {
		setShowDeleteModal(false);
	};
	const handleUserFieldChange: (
		key: keyof UserFromServerType,
		value: string | number | boolean
	) => void = (
		key: keyof UserFromServerType,
		value: string | number | boolean
	): void => {
		setUserDataCopy((prev: UserFromServerType | null) =>
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
		setUserDataCopy((prevUserData: UserFromServerType | null) => {
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

	console.log('userDataCopy', userDataCopy);

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
		role: 'ROLE',
		verified: 'VERIFIED',
	};

	const labelsadres: LabelAdresType = {
		country: 'COUNTRY',
		city: 'CITY',
		street: 'STREET',
		number: 'STREET NUMBER',
		apartment: 'APARTMENT',
		postalCode: 'POSTAL CODE',
	};

	const handleUpdateUser: () => Promise<void> = async (): Promise<void> => {
		try {
			const response: Response = await fetch(
				`/api/user/${userData?.id}/full`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(userDataCopy),
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				setUserData(userDataCopy);
				setIsEditingModal(false);
			}
		} catch (err) {
			console.error('Error updating user:', err);
		}
	};

	return (
		<div className='relative flex h-full w-full flex-col gap-4'>
			{isEditingModal && (
				<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
					<div className='bg-lightGray flex w-3/4 flex-col gap-8 rounded-lg p-6 shadow-lg'>
						<div className='flex gap-2'>
							<Image
								src={'/editIcon.svg'}
								width={32}
								height={32}
								alt={'editIcon'}
							/>
							<h2 className='text-2xl font-bold'>EDIT USER</h2>
						</div>
						<div className='flex flex-row justify-between'>
							<div className='flex w-1/2 flex-col gap-4'>
								USER DETAILS
								<div className='flex w-full flex-col gap-4'>
									<div className='flex items-center justify-between'>
										<p className='w-2/5 font-bold'>ID:</p>
										<p className='w-3/5 text-left'>
											{userData?.id}
										</p>
									</div>
									<div className='flex items-center justify-between'>
										<p className='w-2/5 font-bold'>
											USERNAME:
										</p>
										<p className='w-3/5 text-left'>
											{userData?.userName}
										</p>
									</div>
									<div className='flex items-center justify-between'>
										<p className='w-2/5 font-bold'>
											EMAIL:
										</p>
										<p className='w-3/5 text-left'>
											{userData?.email}
										</p>
									</div>
								</div>
								<table className='w-full'>
									<tbody>
										{userDataCopy &&
											(
												Object.keys(labels) as Array<
													keyof typeof labels
												>
											).map(
												(key: keyof typeof labels) => (
													<tr className='' key={key}>
														<td className='w-2/5 py-1 font-bold'>
															{labels[key]}:
														</td>
														<td className='py-1'>
															<input
																type={
																	key ===
																	'verified'
																		? 'checkbox'
																		: 'text'
																}
																value={
																	key !==
																	'verified'
																		? userDataCopy[
																				key
																			]
																		: undefined
																}
																checked={
																	key ===
																	'verified'
																		? userDataCopy[
																				key
																			]
																		: undefined
																}
																onChange={(
																	e: React.ChangeEvent<HTMLInputElement>
																) =>
																	handleUserFieldChange(
																		key,
																		key ===
																			'verified'
																			? e
																					.target
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
																className='bg-[#3b3b3b] p-1.5'
															/>
														</td>
													</tr>
												)
											)}
									</tbody>
								</table>
							</div>
							<div className='flex w-1/2 flex-col gap-4'>
								<h2>ADDRESSES</h2>

								{userDataCopy?.address.map(
									(
										addressItem: AddressType,
										index: number
									) => (
										<div
											className='border-red mb-2 flex flex-wrap rounded-2xl border-2 p-2'
											key={index}
										>
											{(
												Object.keys(
													labelsadres
												) as Array<
													keyof typeof labelsadres
												>
											).map(
												(
													key: keyof typeof labelsadres
												) => (
													<div
														className='my-1 flex w-1/2 flex-col'
														key={key}
													>
														<p>
															{labelsadres[key]}
														</p>

														<input
															type='text'
															value={
																addressItem[key]
															}
															className='w-11/12 bg-[#3b3b3b] p-1.5'
															onChange={(
																e: React.ChangeEvent<HTMLInputElement>
															) =>
																handleUserAddressChange(
																	index,
																	key,
																	e.target
																		.value
																)
															}
														/>
													</div>
												)
											)}
										</div>
									)
								)}
							</div>
						</div>

						<div className='flex justify-center gap-4'>
							<button
								onClick={() =>
									setIsEditingModal(!isEditingModal)
								}
								className='bg-red rounded px-6 py-2 text-white transition hover:bg-red-600'
							>
								Cancel
							</button>
							<button
								onClick={handleUpdateUser}
								className='bg-green rounded px-6 py-2 text-white transition hover:bg-green-800'
							>
								Yes
							</button>
						</div>
					</div>
				</div>
			)}
			{showDeleteModal && (
				<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
					<div className='bg-lightGray w-96 rounded-lg p-6 shadow-lg'>
						<h2 className='text-light mb-4 text-center text-xl font-semibold'>
							Are you sure you want to delete
							{userData?.firstName} {userData?.lastName}?
						</h2>
						<div className='flex justify-center gap-4'>
							<button
								onClick={deleteUser}
								className='bg-green rounded px-6 py-2 text-white transition hover:bg-green-800'
							>
								Yes
							</button>
							<button
								onClick={cancelDeleteUser}
								className='bg-red rounded px-6 py-2 text-white transition hover:bg-red-600'
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			{loading && <p>Loading...</p>}
			{userData && (
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
								{userData.firstName} {userData.lastName}
							</p>
						</div>

						<div className='flex gap-4'>
							<button
								className='bg-red text-light rounded-md px-4 py-2 font-bold'
								onClick={handleDeleteClick}
							>
								DELETE USER
							</button>

							<button
								className='text-light rounded-md bg-blue-500 px-4 py-2 font-bold'
								onClick={() =>
									setIsEditingModal(!isEditingModal)
								}
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
									{userData &&
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
													{key === 'verified' ? (
														<input
															type='checkbox'
															checked={
																userData[key]
															}
															disabled={true}
														/>
													) : (
														<p>{userData[key]}</p>
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
							{userData.address.length != 0 ? (
								<Address address={userData.address} />
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
