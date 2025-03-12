import { useState } from 'react';
import User from '../../components/User';

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

export default function UsersList() {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchField, setSearchField] = useState<
		'id' | 'name' | 'email' | 'surname' | 'accountType'
	>('id');
	const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);

	const handleSearch = () => {
		const lowercasedQuery = searchQuery.toLowerCase();
		const filtered = users.filter((user) => {
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

	const updateUser = (updatedUser: UserType) => {
		setFilteredUsers((prevUsers) => 
			prevUsers.map((user) => user.id === updatedUser.id ? updatedUser : user)
		);
	}

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Lista użytkowników</h2>
			<div className="flex mb-4">
				<input
					type="text"
					placeholder="Wyszukaj..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="border px-4 py-2 mr-2"
				/>
				<select
					value={searchField}
					onChange={(e) =>
						setSearchField(
							e.target.value as
								| 'id'
								| 'name'
								| 'email'
								| 'surname'
								| 'accountType'
						)
					}
					className="border px-4 py-2 mr-2"
				>
					<option value="id">ID</option>
					<option value="name">Imię</option>
					<option value="email">E-mail</option>
					<option value="surname">Nazwisko</option>
					<option value="accountType">Typ konta</option>
				</select>
				<button
					onClick={handleSearch}
					className="bg-blue-500 text-white px-4 py-2"
				>
					Szukaj
				</button>
			</div>
			{filteredUsers.map((user) => (
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
