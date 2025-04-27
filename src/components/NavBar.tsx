'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import DashboardButton from './DashboardButton';
import Image from 'next/image';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface NavBarProps {
	showLogoutModal: (arg: boolean) => void;
}

interface Link {
	name: string;
	href: string;
	icon: string;
}

export default function NavBar({
	showLogoutModal,
}: NavBarProps): React.JSX.Element {
	const router: AppRouterInstance = useRouter();
	const pathname: string = usePathname();

	const links: Link[] = [
		{ name: 'USERS', href: '/dashboard/users', icon: '/user-group-02.svg' },
		{
			name: 'COURIERS',
			href: '/dashboard/couriers',
			icon: '/truck-delivery-icon.svg',
		},
		{
			name: 'PACKAGES',
			href: '/dashboard/packages',
			icon: '/package-icon.svg',
		},
		{
			name: 'APP SETTINGS',
			href: '/dashboard/settings',
			icon: '/settings-icon.svg',
		},
		{ name: 'REPORTS', href: '/dashboard/reports', icon: '/file-01.svg' },
	];

	const handleLogout: () => void = (): void => {
		showLogoutModal(true);
	};

	return (
		<div className='w-ful flex h-full flex-col gap-4 p-4 text-white'>
			<div>
				<Image
					width={210}
					height={50}
					src='/logo.svg'
					alt={'Logo'}
					priority={true}
				/>
			</div>
			<DashboardButton
				key={'Home'}
				onClick={() => router.push('/dashboard')}
				imgSrc={'/home-09.svg'}
				imgAlt={'home'}
				buttonText={'HOME'}
				selectedContent={pathname}
				actualContent={'/dashboard'}
			/>
			{links.map((link: Link) => (
				<DashboardButton
					key={link.name}
					onClick={() => router.push(link.href)}
					imgSrc={link.icon}
					imgAlt={link.name}
					buttonText={link.name}
					selectedContent={pathname}
					actualContent={link.href}
				/>
			))}
			<div className='mt-auto'>
				<DashboardButton
					key={'Logout'}
					onClick={handleLogout}
					imgSrc={'/logout-02.svg'}
					imgAlt={'Logout'}
					buttonText={'LOGOUT'}
					selectedContent={pathname}
					actualContent={null}
				/>
			</div>
		</div>
	);
}
