'use client';

import { useState } from 'react';

interface UserProps extends UserType {
	onUpdateUser: (updatedUser: UserType) => void;
}

export default function User({ id, name, email, accountType, onUpdateUser }: UserProps) {
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
			}

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
			className={`bg-gray-700 p-4 rounded-lg mb-2 border-2 ${borderColor} flex justify-between items-center`}
		>
			<div>
				<h3 className="text-lg font-semibold">{name}</h3>
				<p className="text-gray-300">{email}</p>
				<p className="text-gray-400 text-sm">ID: {id}</p>
				<p className="text-gray-400 text-sm">
					Typ konta: {accountType}
				</p>
			</div>
			<button
				onClick={handleEditClick}
				className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
			>
				Edytuj
			</button>

			{/* Modal Edycji */}
			{isEditing && !showSuccessMessage && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
						<h2 className="text-xl font-semibold text-white mb-4">
							Edytuj użytkownika
						</h2>

						<label className="block text-gray-300">
							Imię i nazwisko:
						</label>
						<input
							type="text"
							value={editedName}
							onChange={(e) =>
								handleChange(
									setEditedName,
									'name',
									e.target.value
								)
							}
							className={`w-full p-2 rounded bg-gray-700 border-2 ${modifiedFields.name ? 'border-yellow-500' : 'border-gray-600'}`}
						/>

						<label className="block text-gray-300 mt-2">
							Email:
						</label>
						<input
							type="email"
							value={editedEmail}
							onChange={(e) =>
								handleChange(
									setEditedEmail,
									'email',
									e.target.value
								)
							}
							className={`w-full p-2 rounded bg-gray-700 border-2 ${modifiedFields.email ? 'border-yellow-500' : 'border-gray-600'}`}
						/>

						<label className="block text-gray-300 mt-2">
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
							className={`w-full p-2 rounded bg-gray-700 border-2 ${modifiedFields.accountType ? 'border-yellow-500' : 'border-gray-600'}`}
						>
							<option value="standard">Standard</option>
							<option value="courier">Courier</option>
						</select>

						<label className="block text-gray-300 mt-2">
							Hasło administratora:
						</label>
						<input
							type="password"
							value={adminPassword}
							onChange={(e) => setAdminPassword(e.target.value)}
							className="w-full p-2 rounded bg-gray-700 border-gray-600"
						/>

						<div className="flex gap-4 justify-center mt-4">
							<button
								onClick={handleSave}
								className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition"
							>
								Zapisz
							</button>
							<button
								onClick={handleCancel}
								className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded transition"
							>
								Anuluj
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Kręciołek ładowania */}
			{isLoading && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="text-white text-xl">Ładowanie...</div>
				</div>
			)}

			{/* Komunikat o zapisaniu zmian */}
			{showSuccessMessage && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg text-center">
						<h2 className="text-xl font-semibold text-white mb-4">
							Zmiany zostały zapisane!
						</h2>
						<button
							onClick={() => setShowSuccessMessage(false)}
							className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition"
						>
							OK
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
