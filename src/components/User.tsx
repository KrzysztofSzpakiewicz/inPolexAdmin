'use client';

import { useState } from 'react';
import React from 'react';
import { UserType } from '@/dto';

interface UserProps extends UserType {
	// eslint-disable-next-line no-unused-vars
	onUpdateUser: (updatedUser: UserType) => void;
}

export default function User({
	id,
	name,
	email,
	accountType,
	onUpdateUser,
}: UserProps) {
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

	const handleEditClick = () => {
		setAdminPassword('');
		setIsEditing(true);
	};

	const handleSave = () => {
		if (!adminPassword) {
			alert('Podaj hasło administratora!');
			return;
		}

		setIsLoading(true);

		setTimeout(() => {
			const updatedUser = {
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

	const handleCancel = () => {
		setEditedName(name);
		setEditedEmail(email);
		setEditedAccountType(accountType);
		setAdminPassword('');
		setModifiedFields({});
		setIsEditing(false);
	};

	const handleChange = <T,>(
		setter: React.Dispatch<React.SetStateAction<T>>,
		field: string,
		value: T
	) => {
		setter(value);
		setModifiedFields((prev) => ({ ...prev, [field]: true }));
	};

	const borderColor =
		accountType === 'courier' ? 'border-green-500' : 'border-blue-500';

	return (
		<div
			className={`mb-2 rounded-lg border-2 bg-gray-700 p-4 ${borderColor} flex items-center justify-between`}
		>
			<div>
				<h3 className='text-lg font-semibold'>{name}</h3>
				<p className='text-gray-300'>{email}</p>
				<p className='text-sm text-gray-400'>ID: {id}</p>
				<p className='text-sm text-gray-400'>
					Typ konta: {accountType}
				</p>
			</div>

			<button
				onClick={handleEditClick}
				className='rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600'
			>
				Edytuj
			</button>

			{/* Modal Edycji */}
			{isEditing && !showSuccessMessage && (
				<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
					<div className='w-96 rounded-lg bg-gray-800 p-6 shadow-lg'>
						<h2 className='mb-4 text-xl font-semibold text-white'>
							Edytuj użytkownika
						</h2>

						<label className='block text-gray-300'>
							Imię i nazwisko:
						</label>
						<input
							type='text'
							value={editedName}
							onChange={(e) =>
								handleChange(
									setEditedName,
									'name',
									e.target.value
								)
							}
							className={`w-full rounded border-2 bg-gray-700 p-2 ${modifiedFields.name ? 'border-yellow-500' : 'border-gray-600'}`}
						/>

						<label className='mt-2 block text-gray-300'>
							Email:
						</label>
						<input
							type='email'
							value={editedEmail}
							onChange={(e) =>
								handleChange(
									setEditedEmail,
									'email',
									e.target.value
								)
							}
							className={`w-full rounded border-2 bg-gray-700 p-2 ${modifiedFields.email ? 'border-yellow-500' : 'border-gray-600'}`}
						/>

						<label className='mt-2 block text-gray-300'>
							Typ konta:
						</label>
						<select
							value={editedAccountType}
							onChange={(e) =>
								handleChange(
									setEditedAccountType,
									'accountType',
									e.target.value as 'standard' | 'courier'
								)
							}
							className={`w-full rounded border-2 bg-gray-700 p-2 ${modifiedFields.accountType ? 'border-yellow-500' : 'border-gray-600'}`}
						>
							<option value='standard'>Standard</option>
							<option value='courier'>Courier</option>
						</select>

						<label className='mt-2 block text-gray-300'>
							Hasło administratora:
						</label>
						<input
							type='password'
							value={adminPassword}
							onChange={(e) => setAdminPassword(e.target.value)}
							className='w-full rounded border-gray-600 bg-gray-700 p-2'
						/>

						<div className='mt-4 flex justify-center gap-4'>
							<button
								onClick={handleSave}
								className='rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700'
							>
								Zapisz
							</button>
							<button
								onClick={handleCancel}
								className='rounded bg-red-600 px-6 py-2 text-white transition hover:bg-red-700'
							>
								Anuluj
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
