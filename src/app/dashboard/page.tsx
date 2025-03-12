'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Users from '../users/page';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function Dashboard(): React.JSX.Element {
	const [selectedContent, setSelectedContent] = useState('content1');
	const [loading, setLoading] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [fadeOut, setFadeOut] = useState<boolean>(false);
	const router: AppRouterInstance = useRouter();

	useEffect(() => {
		const token: string | undefined = Cookies.get('authToken');
		if (!token) router.push('/');
	}, [router]);

	const handleClick: (content: string) => void = (content: string) => {
		if (selectedContent === content) return;

		setLoading(true);

		setTimeout(() => {
			setSelectedContent(content);
			setLoading(false);
		}, 1800);
	};

	const handleLogout: () => void = () => {
		setShowLogoutModal(true);
	};

	const confirmLogout: () => void = () => {
		setFadeOut(true);
		setTimeout(() => {
			Cookies.remove('authToken');
			router.push('/');
		}, 600);
	};

	const cancelLogout: () => void = () => {
		setShowLogoutModal(false);
	};

	const renderContent: () => React.JSX.Element = () => {
		switch (selectedContent) {
			case 'content1':
				return <Users />;

			case 'content2':
				return (
					<div>
						Content 2 - podgląd wszytskich kurierów, zarządzanie
						kurierami ale nie ich danymi, podględ paczek
						przypisanych do nich ich stanu oraz histori,
					</div>
				);
			case 'content3':
				return (
					<div>
						Content 3 - podgląd paczek zakonczonych, aktualnie
						dostarczanych, nie przetworzonych, wygodne przypisanie
						wielu paczek do jednego kuriera
					</div>
				);
			case 'content4':
				return <div>Content 4 - zmiana hasla admina</div>;
			case 'content5':
				return (
					<div>
						Content 5 - mozliwosc włączenia/wyłączenia automatycznie
						przydzieljącego paczki do kurierów, mozliwosc wyłaczenia
						aplikacji, zarządzanie opcjami takimi jak ceny dostawy w
						czasie x,
					</div>
				);
			default:
				return <div>Wybierz opcję z menu po lewej stronie</div>;
		}
	};

	return (
		<>
			{/* Animacja fade-out formularza po potwierdzeniu wylogowania się */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: fadeOut ? 0 : 1 }} // Fade-out zaczyna się po kliknięciu
				transition={{ duration: 0.3 }}
				// className="bg-gray-900 text-white p-8 rounded-xl w-96 shadow-lg"
			>
				<div className='flex min-h-screen'>
					{/* Lewa strona - Menu */}
					<div className='flex w-64 flex-col gap-4 bg-gray-800 p-6 text-white'>
						<button
							onClick={() => handleClick('content1')}
							className={`rounded p-3 transition ${
								selectedContent === 'content1'
									? 'border-2 border-blue-500 bg-blue-700'
									: 'bg-blue-600 hover:bg-blue-700'
							}`}
						>
							Users
						</button>
						<button
							onClick={() => handleClick('content2')}
							className={`rounded p-3 transition ${
								selectedContent === 'content2'
									? 'border-2 border-blue-500 bg-blue-700'
									: 'bg-blue-600 hover:bg-blue-700'
							}`}
						>
							Couriers
						</button>
						<button
							onClick={() => handleClick('content3')}
							className={`rounded p-3 transition ${
								selectedContent === 'content3'
									? 'border-2 border-blue-500 bg-blue-700'
									: 'bg-blue-600 hover:bg-blue-700'
							}`}
						>
							Packages
						</button>
						<button
							onClick={() => handleClick('content4')}
							className={`rounded p-3 transition ${
								selectedContent === 'content4'
									? 'border-2 border-blue-500 bg-blue-700'
									: 'bg-blue-600 hover:bg-blue-700'
							}`}
						>
							New password
						</button>

						<button
							onClick={() => handleClick('content5')}
							className={`rounded p-3 transition ${
								selectedContent === 'content5'
									? 'border-2 border-blue-500 bg-blue-700'
									: 'bg-blue-600 hover:bg-blue-700'
							}`}
						>
							Application
						</button>

						{/* Przycisk Wyloguj */}
						<button
							onClick={handleLogout}
							className='mt-6 w-full rounded bg-red-600 p-3 py-2 font-semibold text-white transition hover:bg-red-700'
						>
							Wyloguj się
						</button>
					</div>

					{/* Prawa strona - Content */}
					<div className='flex-1 bg-gray-900 p-6 text-white'>
						{/* Pokazanie animacji ładowania podczas przejścia */}
						{loading ? (
							<div className='flex min-h-full items-center justify-center'>
								<div className='h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-600'></div>
							</div>
						) : (
							renderContent() // Renderowanie wybranego contentu po zakończeniu ładowania
						)}
					</div>

					{/* Modal Wylogowania */}
					{showLogoutModal && (
						<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
							<div className='w-96 rounded-lg bg-gray-800 p-6 shadow-lg'>
								<h2 className='mb-4 text-center text-xl font-semibold text-white'>
									Czy na pewno chcesz się wylogować?
								</h2>
								<div className='flex justify-center gap-4'>
									<button
										onClick={confirmLogout}
										className='rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700'
									>
										Tak
									</button>
									<button
										onClick={cancelLogout}
										className='rounded bg-red-600 px-6 py-2 text-white transition hover:bg-red-700'
									>
										Anuluj
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</motion.div>
		</>
	);
}
