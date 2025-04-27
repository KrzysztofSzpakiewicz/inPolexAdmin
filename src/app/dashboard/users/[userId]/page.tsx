'use client';

import Image from 'next/image';
import React, { useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter, useParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AddressFromServerType, UserFromServerType } from './dataTypes';
import Address from './components/Address';
import UserDetails from './components/UserDetails';
import EditUserModal from './components/EditUserModal';
const token: string | undefined = Cookies.get('authToken');

export default function User(): React.JSX.Element {
	const router: AppRouterInstance = useRouter();
	const { userId } = useParams();

	const [loading, setLoading] = React.useState<boolean>(true);
	const [fetchedUserData, setFetchedUserData] = React.useState<
		UserFromServerType | undefined
	>(undefined);

	const [isDeleteModalOpen, setIsDeleteModalOpen] =
		React.useState<boolean>(false);

	const [isEditingModalOpen, setIsEditingModalOpen] =
		React.useState<boolean>(false);

	const fetchUserData: () => Promise<void> =
		useCallback(async (): Promise<void> => {
			if (!userId) return setLoading(false);
			setLoading(true);
			try {
				const res: Response = await fetch(`/api/user/${userId}/full`, {
					method: 'GET',
					headers: {
						Accept: '*/*',
						Authorization: `Bearer ${token}`,
					},
				});
				if (!res.ok)
					throw new Error(`HTTP error! status: ${res.status}`);
				const data: UserFromServerType = await res.json();
				setFetchedUserData(data);
			} catch (err) {
				console.error('Error fetching user data:', err);
			} finally {
				setLoading(false);
			}
		}, [userId]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	const deleteUser: () => Promise<void> = async (): Promise<void> => {
		try {
			alert('Deleting user...');

			const response: Response = await fetch(
				`/api/user/${fetchedUserData?.id}`,
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

	const handleEditUser: () => void = () => {
		setIsEditingModalOpen(true);
	};
	const handleUpdateUser: (userDetails: UserFromServerType) => void = (
		userDetails: UserFromServerType
	) => {
		const updateUser: () => Promise<void> = async (): Promise<void> => {
			try {
				setLoading(true);
				const response: Response = await fetch(
					`/api/user/${userId}/full`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(userDetails),
					}
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				await fetchUserData();
			} catch (err) {
				console.error('Error updating user data:', err);
			} finally {
				setIsEditingModalOpen(false);
				setLoading(false);
			}
		};
		updateUser();
		setIsEditingModalOpen(false);
	};

	return (
		<div className=''>
			{/* MODAL ŁADOWANIA */}
			{loading && (
				<div className='bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black'>
					<div className='mt-4 flex justify-center'>
						<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
					</div>
				</div>
			)}
			{/* MODAL USUWANIA USERA */}
			{fetchedUserData && isDeleteModalOpen && (
				<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
					<div className='bg-lightGray flex flex-col gap-4 rounded-lg p-8 shadow-lg'>
						<h2 className='text-light text-center text-xl font-semibold'>
							Are you sure you want to delete:
						</h2>
						<p className='text-center text-lg font-bold'>
							{fetchedUserData.firstName.toLocaleUpperCase()}{' '}
							{fetchedUserData.lastName.toLocaleUpperCase()}
						</p>
						<div className='flex flex-row justify-center gap-2'>
							<button
								className='bg-red text-light rounded-md px-4 py-2 font-bold hover:bg-red-600'
								onClick={() => {
									deleteUser();
								}}
							>
								DELTE
							</button>
							<button
								className='text-light bg-green rounded-md px-4 py-2 font-bold hover:bg-green-600'
								onClick={() => setIsDeleteModalOpen(false)}
							>
								CANCEL
							</button>
						</div>
					</div>
				</div>
			)}

			{fetchedUserData && (
				<>
					{/* TOP BAR */}
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4 font-bold transition hover:scale-105'>
							<button
								className='flex items-center'
								onClick={() => router.push('/dashboard/users')}
							>
								<Image
									alt='arrowBack'
									src='/arrows/arrowBack.svg'
									width={32}
									height={32}
								/>
								GO BACK
							</button>
						</div>

						<div className='flex gap-4'>
							<button
								className='bg-red text-light rounded-md px-4 py-2 font-bold hover:bg-red-600'
								onClick={() => setIsDeleteModalOpen(true)}
							>
								DELETE USER
							</button>

							<button
								className='text-light rounded-md bg-blue-600 px-4 py-2 font-bold hover:bg-blue-700'
								onClick={handleEditUser}
							>
								EDIT
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
						<p className='text-4xl font-bold'>
							{fetchedUserData.firstName}{' '}
							{fetchedUserData.lastName}
						</p>
					</div>
					<div className='flex justify-between p-4'>
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
							{/* DANE USERA */}
							<UserDetails userData={fetchedUserData} />

							<div className='flex items-center gap-4 text-xl font-bold'>
								<Image
									alt='locationIcon'
									src='/locationIcon.svg'
									width={24}
									height={24}
								/>
								USER ADDRESSES:
							</div>
							{fetchedUserData.address.map(
								(address: AddressFromServerType) => {
									return (
										<Address
											key={address.id}
											address={address}
										/>
									);
								}
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

			{/* MODAL EDYCJI USERA */}
			{isEditingModalOpen && fetchedUserData && (
				<EditUserModal
					userData={fetchedUserData}
					onClose={() => setIsEditingModalOpen(false)}
					onUpdateUser={handleUpdateUser}
				/>
			)}
		</div>
	);
}
