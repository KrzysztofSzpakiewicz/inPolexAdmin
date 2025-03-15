'use client';
import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import React, { JSX, ReactNode, useEffect, useState } from 'react';

export default function DashboardLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
	const [fadeOut, setFadeOut] = useState<boolean>(false);

	useEffect(() => {
		const token: string | undefined = Cookies.get('authToken');
		if (!token) router.push('/');
	}, [router]);

	const confirmLogout: () => void = () => {
		setShowLogoutModal(false);
		setFadeOut(true);
		setTimeout(() => {
			Cookies.remove('authToken');
			router.push('/');
		}, 600);
	};

	const cancelLogout: () => void = () => {
		setShowLogoutModal(false);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: fadeOut ? 0 : 1 }} // Fade-out zaczyna się po kliknięciu
			transition={{ duration: 0.3 }}
		>
			<div className='flex min-h-screen'>
				<div className='bg-darkGray flex w-fit max-w-80 flex-col gap-4 p-6 text-white'>
					<NavBar showLogoutModal={setShowLogoutModal} />
				</div>
				<div className='bg-lightGray flex-1 p-6 text-white'>
					{children}
				</div>

				{/* Modal Wylogowania */}
				{showLogoutModal && (
					<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
						<div className='bg-lightGray w-96 rounded-lg p-6 shadow-lg'>
							<h2 className='text-light mb-4 text-center text-xl font-semibold'>
								Are you sure you want to sing out?
							</h2>
							<div className='flex justify-center gap-4'>
								<button
									onClick={confirmLogout}
									className='bg-green rounded px-6 py-2 text-white transition hover:bg-green-800'
								>
									Yes
								</button>
								<button
									onClick={cancelLogout}
									className='bg-red rounded px-6 py-2 text-white transition hover:bg-red-600'
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</motion.div>
	);
}
