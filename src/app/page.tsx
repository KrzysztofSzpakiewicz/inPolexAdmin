'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Importujemy Framer Motion
import Image from 'next/image';

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
		<div className="flex items-center justify-center min-h-screen bg-[#232323]">
			{/* Animacja fade-out formularza po kliknięciu logowania */}
			<motion.div
				initial={{ opacity: 1 }}
				animate={{ opacity: fadeOut ? 0 : 1 }} // Fade-out zaczyna się po kliknięciu
				transition={{ duration: 0.3 }}
				className="bg-[#2c2b2b] text-white p-8 rounded-xl w-96 shadow-lg border-2 border-[#ab2337]"
			>
				{/* Logo zamiast tekstu */}
				<div className="flex justify-center mb-6">
					<Image
						src="/logo-admin.png"
						alt="inPolex Admin"
						width={150} // Szerokość obrazu
						height={0} // Wysokość ustawiona na 0, ponieważ będzie automatycznie obliczana
						priority // Zapewnia szybkie ładowanie dla lepszego LCP
						style={{ width: '100%', height: 'auto' }} // Proporcjonalne ustawienie wysokości
						layout="responsive" // Ustawia obraz jako responsywny, zachowując proporcje
					/>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<input
						type="text"
						name="username"
						placeholder="Email"
						className="p-3 rounded bg-[#232323] text-white border border-[#2c2b2b] focus:outline-none focus:border-[#ab2337]"
						value={form.username}
						onChange={handleChange}
						required
						disabled={loading} // Wyłącza pole podczas ładowania
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="p-3 rounded bg-[#232323] text-white border border-[#2c2b2b] focus:outline-none focus:border-[#ab2337]"
						value={form.password}
						onChange={handleChange}
						required
						disabled={loading} // Wyłącza pole podczas ładowania
					/>

					{/* Animacja przycisku */}
					<motion.button
						type="submit"
						whileTap={{ scale: 0.95 }} // Efekt wciśnięcia
						className="border border-[#2c2b2b] bg-[#232323] hover:border-[#ab2337] text-white font-semibold py-3 rounded transition"
						disabled={loading} // Przyciski również wyłączone podczas ładowania
					>
						Zaloguj się
					</motion.button>

					{/* Animacja ładowania */}
					{loading && (
						<div className="flex justify-center mt-4">
							<div className="w-8 h-8 border-t-4 border-[#ab2337] border-solid rounded-full animate-spin"></div>
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
