'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Importujemy Framer Motion

export default function Home() {
	const [form, setForm] = useState({ username: '', password: '' });
	const [loading, setLoading] = useState(false); // Stan animacji ładowania
	const [error, setError] = useState(''); // Stan błędu
	const [fadeOut, setFadeOut] = useState(false); // Stan do animacji fade-out
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true); // Rozpoczynamy ładowanie
		setError(''); // Resetujemy ewentualny błąd

		// Symulujemy zapytanie do serwera
		setTimeout(() => {
			// Symulujemy sprawdzenie danych logowania
			if (form.username === 'admin' && form.password === 'admin') {
				// Jeśli dane poprawne, animacja fade-out przed przekierowaniem
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
		<div className="flex items-center justify-center min-h-screen bg-black">
			{/* Animacja fade-out formularza po kliknięciu logowania */}
			<motion.div
				initial={{ opacity: 1 }}
				animate={{ opacity: fadeOut ? 0 : 1 }} // Fade-out zaczyna się po kliknięciu
				transition={{ duration: 0.3 }}
				className="bg-gray-900 text-white p-8 rounded-xl w-96 shadow-lg"
			>
				<h1 className="text-2xl font-semibold text-center mb-6">
					inPolex Admin
				</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<input
						type="text"
						name="username"
						placeholder="Nazwa użytkownika"
						className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gray-500"
						value={form.username}
						onChange={handleChange}
						required
						disabled={loading} // Wyłącza pole podczas ładowania
					/>
					<input
						type="password"
						name="password"
						placeholder="Hasło"
						className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gray-500"
						value={form.password}
						onChange={handleChange}
						required
						disabled={loading} // Wyłącza pole podczas ładowania
					/>

					{/* Animacja przycisku */}
					<motion.button
						type="submit"
						whileTap={{ scale: 0.95 }} // Efekt wciśnięcia
						className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
						disabled={loading} // Przyciski również wyłączone podczas ładowania
					>
						Zaloguj się
					</motion.button>

					{/* Animacja ładowania */}
					{loading && (
						<div className="flex justify-center mt-4">
							<div className="w-8 h-8 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
						</div>
					)}

					{/* Komunikat o błędzie */}
					{error && (
						<p className="text-red-500 text-sm text-center mt-2">
							{error}
						</p>
					)}
				</form>
			</motion.div>
		</div>
	);
}
