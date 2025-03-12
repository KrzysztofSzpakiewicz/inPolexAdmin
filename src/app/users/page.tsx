import { useState } from 'react';
import User from '../../components/User';
import { UserType } from '@/dto';
import React from 'react';

const users: UserType[] = [
	{
		id: 1,
		name: 'Jan Kowalski',
		email: 'jan.kowalski@example.com',
		accountType: 'standard',
	},
	{
		id: 2,
		name: 'Anna Nowak',
		email: 'anna.nowak@example.com',
		accountType: 'courier',
	},
	{
		id: 3,
		name: 'Piotr Wiśniewski',
		email: 'piotr.wisniewski@example.com',
		accountType: 'standard',
	},
];

export default function UsersList(): React.JSX.Element {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchField, setSearchField] = useState<
		'id' | 'name' | 'email' | 'surname' | 'accountType'
	>('id');
	const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);

	const handleSearch: () => void = () => {
		const lowercasedQuery: string = searchQuery.toLowerCase();
		const filtered: UserType[] = users.filter((user: UserType) => {
			switch (searchField) {
				case 'id':
					return user.id.toString().includes(lowercasedQuery);
				case 'name':
					return user.name.toLowerCase().includes(lowercasedQuery);
				case 'email':
					return user.email.toLowerCase().includes(lowercasedQuery);
				case 'surname':
					return user.name
						.split(' ')[1]
						?.toLowerCase()
						.includes(lowercasedQuery);
				case 'accountType':
					return user.accountType
						.toLowerCase()
						.includes(lowercasedQuery.toLowerCase());
				default:
					return false;
			}
		});
		setFilteredUsers(filtered);
	};

	const updateUser: (updatedUser: UserType) => void = (
		updatedUser: UserType
	) => {
		setFilteredUsers((prevUsers: UserType[]) =>
			prevUsers.map((user: UserType) =>
				user.id === updatedUser.id ? updatedUser : user
			)
		);
	};

	return (
		<div>
			<h2 className='mb-4 text-xl font-bold'>Lista użytkowników</h2>
			<div className='mb-4 flex'>
				<input
					type='text'
					placeholder='Wyszukaj...'
					value={searchQuery}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setSearchQuery(e.target.value)
					}
					className='mr-2 border px-4 py-2'
				/>
				<select
					value={searchField}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setSearchField(
							e.target.value as
								| 'id'
								| 'name'
								| 'email'
								| 'surname'
								| 'accountType'
						)
					}
					className='mr-2 border px-4 py-2'
				>
					<option value='id'>ID</option>
					<option value='name'>Imię</option>
					<option value='email'>E-mail</option>
					<option value='surname'>Nazwisko</option>
					<option value='accountType'>Typ konta</option>
				</select>
				<button
					onClick={handleSearch}
					className='bg-blue-500 px-4 py-2 text-white'
				>
					Szukaj
				</button>
			</div>
			{filteredUsers.map((user: UserType) => (
				<User
					key={user.id}
					id={user.id}
					name={user.name}
					email={user.email}
					accountType={user.accountType}
					onUpdateUser={updateUser}
				/>
			))}
		</div>
	);
}
