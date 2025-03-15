'use client';

import { useState } from 'react';
import React from 'react';
import { UserType } from '@/dto';

interface UserProps extends UserType {
	onUpdateUser: (updatedUser: UserType) => void;
}

export default function User({
	id,
	name,
	email,
	accountType,
	onUpdateUser,
}: UserProps): React.JSX.Element {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState(name);
	const [editedEmail, setEditedEmail] = useState(email);
	const [editedAccountType, setEditedAccountType] = useState(accountType);
	const [adminPassword, setAdminPassword] = useState('');
	const [modifiedFields, setModifiedFields] = useState<{
		name?: boolean;
		email?: boolean;
		accountType?: boolean;
	}>({});
	const [isLoading, setIsLoading] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const handleEditClick: () => void = () => {
		setAdminPassword('');
		setIsEditing(true);
	};

	const handleSave: () => void = () => {
		if (!adminPassword) {
			alert('Podaj hasło administratora!');
			return;
		}

		setIsLoading(true);

		setTimeout(() => {
			const updatedUser: UserType = {
				id,
				name: editedName,
				email: editedEmail,
				accountType: editedAccountType,
			};

			onUpdateUser(updatedUser);

			console.log('Zapisano zmiany:', {
				id,
				editedName,
				editedEmail,
				editedAccountType,
				adminPassword,
			});

			setIsLoading(false);
			setShowSuccessMessage(true);

			setTimeout(() => {
				setShowSuccessMessage(false);
			}, 3000);
			setIsEditing(false);
		}, 2000);
	};

	const handleCancel: () => void = () => {
		setEditedName(name);
		setEditedEmail(email);
		setEditedAccountType(accountType);
		setAdminPassword('');
		setModifiedFields({});
		setIsEditing(false);
	};

	const handleChange: <T>(
		setter: React.Dispatch<React.SetStateAction<T>>,
		field: string,
		value: T
	) => void = <T,>(
		setter: React.Dispatch<React.SetStateAction<T>>,
		field: string,
		value: T
	) => {
		setter(value);
		setModifiedFields(
			(prev: {
				name?: boolean;
				email?: boolean;
				accountType?: boolean;
			}) => ({ ...prev, [field]: true })
		);
	};

	const borderColor: 'border-red' | 'border-light' =
		accountType === 'courier' ? 'border-red' : 'border-light';

	return (
		<div
			className={`bg-navyLight mb-2 rounded-lg border-2 p-4 ${borderColor} flex items-center justify-between`}
		>
			<div>
				<h3 className='text-lg font-semibold'>{name}</h3>
				<p className='text-gray-300'>{email}</p>
				<p className='text-sm text-gray-400'>ID: {id}</p>
				<p className='text-sm text-gray-400'>
					Account type: {accountType}
				</p>
			</div>

			<button
				onClick={handleEditClick}
				className='bg-lightGray hover:bg-darkGray font-montserrat text-light rounded px-3 py-1'
			>
				Edit
			</button>

			{/* Modal Edycji */}
			{isEditing && !showSuccessMessage && (
				<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
					<div className='bg-lightGray w-96 rounded-lg p-6 shadow-lg'>
						<h2 className='font-montserrat text-light mb-4 text-xl font-semibold'>
							Edit user
						</h2>

						<label className='text-light font-montserrat block'>
							Name and surname:
						</label>
						<input
							type='text'
							value={editedName}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) =>
								handleChange(
									setEditedName,
									'name',
									e.target.value
								)
							}
							className={`font-montserrat bg-navyLight w-full rounded border-2 p-2 ${modifiedFields.name ? 'border-light' : 'border-darkGray'}`}
						/>

						<label className='font-montserrat mt-2 block text-gray-300'>
							Email:
						</label>
						<input
							type='email'
							value={editedEmail}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) =>
								handleChange(
									setEditedEmail,
									'email',
									e.target.value
								)
							}
							className={`font-montserrat bg-navyLight w-full rounded border-2 p-2 ${modifiedFields.email ? 'border-light' : 'border-darkGray'}`}
						/>

						<label className='font-montserrat mt-2 block text-gray-300'>
							Account type:
						</label>
						<select
							value={editedAccountType}
							onChange={(
								e: React.ChangeEvent<HTMLSelectElement>
							) =>
								handleChange(
									setEditedAccountType,
									'accountType',
									e.target.value as 'standard' | 'courier'
								)
							}
							className={`bg-navyLight w-full rounded border-2 p-2 ${modifiedFields.accountType ? 'border-light' : 'border-darkGray'}`}
						>
							<option value='standard'>Standard</option>
							<option value='courier'>Courier</option>
						</select>

						<label className='text-light mt-2 block'>
							Admin password:
						</label>
						<input
							type='password'
							value={adminPassword}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setAdminPassword(e.target.value)}
							className='bg-navyLight border-light w-full rounded p-2'
						/>

						<div className='mt-4 flex justify-center gap-4'>
							<button
								onClick={handleSave}
								className='bg-green text-light rounded px-6 py-2 transition hover:bg-green-800'
							>
								Save
							</button>
							<button
								onClick={handleCancel}
								className='bg-red text-light rounded px-6 py-2 transition hover:bg-red-600'
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Kręciołek ładowania */}
			{isLoading && (
				<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
					<div className='text-xl text-white'>Ładowanie...</div>
				</div>
			)}

			{/* Komunikat o zapisaniu zmian */}
			{showSuccessMessage && (
				<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
					<div className='w-96 rounded-lg bg-gray-800 p-6 text-center shadow-lg'>
						<h2 className='mb-4 text-xl font-semibold text-white'>
							Zmiany zostały zapisane!
						</h2>
						<button
							onClick={() => setShowSuccessMessage(false)}
							className='rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700'
						>
							OK
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
