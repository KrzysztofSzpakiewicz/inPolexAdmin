'use client';
import { useCallback, useState } from 'react';
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
		| 'all'
		| 'firstName'
		| 'lastName'
		| 'phoneNumber'
		| 'email'
		| 'verified'
		| 'role'
	>('all');
	const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [showPagination, setShowPagination] = useState<boolean>(false);
	const pageSize: number = 10;

	const addUser: () => void = () => {
		router.push('/dashboard/users/newUser');
	};

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchUsers: (page: number) => Promise<void> = useCallback(
		async (page: number): Promise<void> => {
			setIsLoading(true);
			try {
				const queryString: string = `field=${searchField}&query=${encodeURIComponent(searchQuery || '')}&page=${page}&size=${pageSize}`;

				const response: Response = await fetch(
					`/api/user?${queryString}`,
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
			} finally {
				setIsLoading(false);
			}
		},
		[searchField, searchQuery, pageSize]
	);

	React.useEffect(() => {
		fetchUsers(0); // Fetch users only once on page load
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
		{ value: 'all', label: 'All' },
		{ value: 'id', label: 'ID' },
		{ value: 'firstName', label: 'First Name' },
		{ value: 'lastName', label: 'Last Name' },
		{ value: 'phoneNumber', label: 'Phone Number' },
		{ value: 'email', label: 'Email' },
		{ value: 'verified', label: 'Verified' },
		{ value: 'role', label: 'Role' },
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
		<div className='flex flex-col gap-4'>
			{isLoading && (
				<div className='bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black'>
					<div className='mt-4 flex justify-center'>
						<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
					</div>
				</div>
			)}
			<div className='flex items-center justify-between'>
				<h2 className='font-montserrat text-light flex items-center text-xl font-bold'>
					Users list:
				</h2>
				<button
					onClick={addUser}
					className='bg-red font-montserrat text-light rounded-xl px-4 py-2 font-semibold transition hover:scale-105'
				>
					ADD NEW USER
				</button>
			</div>
			<div className='flex items-end gap-2'>
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
					className='bg-red font-montserrat text-light rounded-xl px-4 py-2 font-semibold transition hover:scale-105'
				>
					SEARCH
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
			<div className='grid grid-cols-2 gap-4'>
				{filteredUsers.map((user: UserType) => (
					<Link
						className='w-full'
						href={{
							pathname: `/dashboard/users/${user.id}`,
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
