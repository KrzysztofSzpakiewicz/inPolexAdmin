'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

import { UserType } from '@/dto';
import React from 'react';
import User from '@/components/User';
import Search from '@/components/Search';
import Select from '@/components/Select';
import Link from 'next/link';

const users: UserType[] = [];
const token: string | undefined = Cookies.get('authToken');

export default function UsersList(): React.JSX.Element {
	const router = useRouter(); // Używamy hooka useRouterv
	const [searchQuery, setSearchQuery] = useState('');
	const [searchField, setSearchField] = useState<
		| 'id'
		| 'firstName'
		| 'lastName'
		| 'phoneNumber'
		| 'email'
		| 'verified'
		| 'role'
	>('id');
	const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);

	const addUser: () => void = () => {
		router.push('/dashboard/users/newUser'); // Teraz router.push działa poprawnie
	};

	const handleSearch: () => Promise<void> = async () => {
		try {
			console.log(token);

			if (!token) {
				throw new Error(
					'No authentication token found. Please log in.'
				);
			}

			const queryString: string = `field=${searchField}&query=${searchQuery}&page=${0}&size=${10}`;

			const response: Response = await fetch(`/api/user?${queryString}`, {
				method: 'GET',
				headers: {
					Accept: '*/*',
					Authorization: `Bearer ${token}`,
				},
			});

			console.log('Status odpowiedzi:', response.status);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log(data);
			alert(JSON.stringify(data.content));
			setFilteredUsers(data.content);
		} catch (err) {
			console.error('Błąd podczas pobierania użytkowników:', err);
			//setError('Wystąpił błąd podczas pobierania użytkowników');
		} finally {
			//setLoading(false);
		}
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

	const selectOptions: { value: string; label: string }[] = [
		{ value: 'id', label: 'id' },
		{ value: 'firstName', label: 'firstName' },
		{ value: 'lastName', label: 'lastName' },
		{ value: 'username', label: 'username' },
		{ value: 'phoneNumber', label: 'phoneNumber' },
		{ value: 'email', label: 'email' },
		{ value: 'verified', label: 'verified' },
		{ value: 'role', label: 'role' },
	];

	return (
		<div>
			<h2 className='font-montserrat text-light mb-4 text-xl font-bold'>
				Users list:
			</h2>
			<div className='mb-4 flex'>
				<Select
					value={searchField}
					options={selectOptions}
					onSelect={(value: string) =>
						setSearchField(
							value as
								| 'id'
								| 'firstName'
								| 'lastName'
								| 'phoneNumber'
								| 'email'
								| 'verified'
								| 'role'
						)
					}
				/>
				<Search onSearch={setSearchQuery} placeholder='Search...' />

				<button
					onClick={handleSearch}
					className='bg-red font-montserrat text-light px-4 py-2 font-semibold'
				>
					Get Users
				</button>

				<button
					onClick={addUser}
					className='bg-red font-montserrat text-light px-4 py-2 font-semibold'
				>
					Add user
				</button>

				<button className='bg-red font-montserrat text-light px-4 py-2 font-semibold'>
					Refresh
				</button>
			</div>
			{filteredUsers.map((user: UserType) => (
				<Link href={`/dashboard/users/${user.id}`} key={user.id}>
					<User
						id={user.id}
						firstName={user.firstName}
						lastName={user.lastName}
						username={user.username}
						phoneNumber={user.phoneNumber}
						verified={user.verified}
						role={user.role}
						email={user.email}
					/>
				</Link>
			))}
		</div>
	);
}
