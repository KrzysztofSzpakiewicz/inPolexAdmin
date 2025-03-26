'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import User from '@/app/dashboard/users/components/User';
import Search from '@/components/Search';
import Select from '@/components/Select';
import Link from 'next/link';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { UsersFromServerType, UserType } from '@/app/dashboard/users/dataTypes';

const users: UserType[] = [];
const token: string | undefined = Cookies.get('authToken');

export default function UsersList(): React.JSX.Element {
	const router: AppRouterInstance = useRouter();
	const [searchQuery, setSearchQuery] = useState<string>(''); // Zmieniono domyślną wartość na pusty ciąg
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
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [showPagination, setShowPagination] = useState<boolean>(false);
	const pageSize: number = 5;

	const addUser: () => void = () => {
		router.push('/dashboard/users/newUser');
	};

	const fetchUsers: (page: number) => Promise<void> = async (
		page: number
	): Promise<void> => {
		try {
			// Używamy pustego ciągu, jeśli searchQuery jest undefined lub null
			const queryString: string = `field=${searchField}&query=${encodeURIComponent(searchQuery || '')}&page=${page}&size=${pageSize}`;

			const response: Response = await fetch(`/api/user?${queryString}`, {
				method: 'GET',
				headers: {
					Accept: '*/*',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: UsersFromServerType = await response.json();
			setFilteredUsers(data.content);

			if (data.content.length > 0) {
				setShowPagination(true);
			} else {
				setShowPagination(false);
			}
		} catch (err) {
			console.log('error', err);
			setFilteredUsers([]);
		}
	};

	const handleSearch: () => Promise<void> = async (): Promise<void> => {
		setCurrentPage(0);
		await fetchUsers(0); // Wywołanie fetchUsers niezależnie od wartości searchQuery
	};

	const handleNextPage: () => Promise<void> = async (): Promise<void> => {
		const nextPage: number = currentPage + 1;
		setCurrentPage(nextPage);
		await fetchUsers(nextPage);
	};

	const handlePreviousPage: () => Promise<void> = async (): Promise<void> => {
		const prevPage: number = currentPage - 1;
		if (prevPage >= 0) {
			setCurrentPage(prevPage);
			await fetchUsers(prevPage);
		}
	};

	const selectOptions: { value: string; label: string }[] = [
		{ value: 'id', label: 'id' },
		{ value: 'firstName', label: 'firstName' },
		{ value: 'lastName', label: 'lastName' },
		{ value: 'phoneNumber', label: 'phoneNumber' },
		{ value: 'email', label: 'email' },
		{ value: 'verified', label: 'verified' },
		{ value: 'role', label: 'role' },
	];

	const roleOptions: { value: string; label: string }[] = [
		{ value: 'ROLE_ADMIN', label: 'Admin' },
		{ value: 'ROLE_COURIER', label: 'Courier' },
		{ value: 'ROLE_USER', label: 'User' },
	];

	const renderSearchInput: () => React.JSX.Element = () => {
		switch (searchField) {
			case 'verified':
				return (
					<input
						type='checkbox'
						checked={searchQuery === 'true'}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setSearchQuery(e.target.checked ? 'true' : 'false')
						}
						className='h-6 w-6'
					/>
				);
			case 'role':
				return (
					<Select
						value={searchQuery}
						options={roleOptions}
						onSelect={(value: string) => setSearchQuery(value)}
					/>
				);
			default:
				return (
					<Search
						onSearch={(value: string) =>
							setSearchQuery(value || '')
						} // Zapewniamy, że pusty ciąg jest przekazywany
						placeholder={`Search by ${searchField}...`}
					/>
				);
		}
	};

	return (
		<div>
			<h2 className='font-montserrat text-light mb-4 text-xl font-bold'>
				Users list:
			</h2>
			<div className='mb-4 flex items-center gap-2'>
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
				{renderSearchInput()}

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

			{showPagination && (
				<div className='mb-4 flex gap-2'>
					{currentPage > 0 && (
						<button
							onClick={handlePreviousPage}
							className='bg-red font-montserrat text-light px-4 py-2 font-semibold'
						>
							Previous Page
						</button>
					)}
					{filteredUsers.length === pageSize && (
						<button
							onClick={handleNextPage}
							className='bg-red font-montserrat text-light px-4 py-2 font-semibold'
						>
							Next Page
						</button>
					)}
				</div>
			)}
			<div className='flex flex-wrap gap-4'>
				{filteredUsers.map((user: UserType) => (
					<Link
						href={{
							pathname: `/dashboard/users/${user.id}`,
							query: {
								id: user.id,
								firstName: user.firstName,
								lastName: user.lastName,
								username: user.username,
								phoneNumber: user.phoneNumber,
								verified: user.verified,
								role: user.role,
								email: user.email,
							},
						}}
						key={user.id}
					>
						<User
							id={user.id}
							firstName={user.firstName}
							lastName={user.lastName}
							role={user.role}
							email={user.email}
						/>
					</Link>
				))}
			</div>
		</div>
	);
}
