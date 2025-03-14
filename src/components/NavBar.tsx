'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
export default function NavBar(): React.JSX.Element {
	const links = [
		{ name: 'USERS', href: '/dashboard/users', icon: '' },
		{ name: 'COURIERS', href: '/dashboard/couriers', icon: '' },
		{ name: 'PACKAGES', href: '/dashboard/packages', icon: '' },
		{ name: 'APP SETTINGS', href: '/dashboard/settings', icon: '' },
		{ name: 'REPORTS', href: '/dashboard/reports', icon: '' },
	];

	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const router = useRouter();
	const handleLogout = () => {
		setShowLogoutModal(true);
	};
	const confirmLogout = () => {
		setShowLogoutModal(false);
		router.push('/');
	};

	const cancelLogout = () => {
		setShowLogoutModal(false);
	};
	return (
		<div className='flex w-full flex-col gap-4 bg-gray-800 text-white'>
			<Link href={'/dashboard'} className='bg-blue-600 hover:bg-blue-700'>
				HOME
			</Link>
			{links.map((link) => (
				<Link
					href={link.href}
					key={link.name}
					className='bg-blue-600 hover:bg-blue-700'
				>
					{link.name}
				</Link>
			))}
			<button
				onClick={handleLogout}
				className='mt-6 w-full rounded bg-red-600 p-3 py-2 font-semibold text-white transition hover:bg-red-700'
			>
				LOGOUT
			</button>
		</div>
	);
}
