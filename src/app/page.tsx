'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Importujemy Framer Motion
import Image from 'next/image';
import Cookies from 'js-cookie';
import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function Home(): React.JSX.Element {
	const [form, setForm] = useState({ username: '', password: '' });
	const [loading, setLoading] = useState(false); // Stan animacji ładowania
	const [error, setError] = useState(''); // Stan błędu
	const [fadeOut, setFadeOut] = useState(false); // Stan do animacji fade-out
	const router: AppRouterInstance = useRouter();

	const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		setLoading(true); // Rozpoczynamy ładowanie
		setError(''); // Resetujemy ewentualny błąd
		// Symulujemy zapytanie do serwera
		setTimeout(() => {
			// Symulujemy sprawdzenie danych logowania
			if (form.username === 'admin' && form.password === 'admin') {
				// Jeśli dane poprawne, animacja fade-out przed przekierowaniem
				Cookies.set('authToken', 'token', { expires: 1 });
				setFadeOut(true);
				setTimeout(() => {
					router.push('/dashboard');
				}, 300); // Dajemy 300ms na animację fade-out
			} else {
				// Jeśli dane niepoprawne, pokazujemy komunikat o błędzie
				setError('Błędna nazwa użytkownika lub hasło');
				setLoading(false); // Zatrzymujemy animację ładowania
			}
		}, 2000); // Symulujemy opóźnienie serwera (2 sekundy)
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-[#232323]'>
			{/* Animacja fade-out formularza po kliknięciu logowania */}
			<motion.div
				initial={{ opacity: 1 }}
				animate={{ opacity: fadeOut ? 0 : 1 }} // Fade-out zaczyna się po kliknięciu
				transition={{ duration: 0.3 }}
				className='w-96 rounded-xl border-2 border-[#ab2337] bg-[#2c2b2b] p-8 text-white shadow-lg'
			>
				{/* Logo zamiast tekstu */}
				<div className='mb-6 flex justify-center'>
					<Image
						src='/logo-admin.png'
						alt='inPolex Admin'
						width={150} // Szerokość obrazu
						height={0} // Wysokość ustawiona na 0, ponieważ będzie automatycznie obliczana
						priority // Zapewnia szybkie ładowanie dla lepszego LCP
						style={{ width: '100%', height: 'auto' }} // Proporcjonalne ustawienie wysokości
						layout='responsive' // Ustawia obraz jako responsywny, zachowując proporcje
					/>
				</div>

				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<input
						type='text'
						name='username'
						placeholder='Email'
						className='rounded border border-[#2c2b2b] bg-[#232323] p-3 text-white focus:border-[#ab2337] focus:outline-none'
						value={form.username}
						onChange={handleChange}
						required
						disabled={loading} // Wyłącza pole podczas ładowania
					/>
					<input
						type='password'
						name='password'
						placeholder='Password'
						className='rounded border border-[#2c2b2b] bg-[#232323] p-3 text-white focus:border-[#ab2337] focus:outline-none'
						value={form.password}
						onChange={handleChange}
						required
						disabled={loading} // Wyłącza pole podczas ładowania
					/>

					{/* Animacja przycisku */}
					<motion.button
						type='submit'
						whileTap={{ scale: 0.95 }} // Efekt wciśnięcia
						className='rounded border border-[#2c2b2b] bg-[#232323] py-3 font-semibold text-white transition hover:border-[#ab2337]'
						disabled={loading} // Przyciski również wyłączone podczas ładowania
					>
						Zaloguj się
					</motion.button>

					{/* Animacja ładowania */}
					{loading && (
						<div className='mt-4 flex justify-center'>
							<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
						</div>
					)}

					{/* Komunikat o błędzie */}
					{error && (
						<p className='mt-2 text-center text-sm text-red-500'>
							{error}
						</p>
					)}
				</form>
			</motion.div>
		</div>
	);
}
