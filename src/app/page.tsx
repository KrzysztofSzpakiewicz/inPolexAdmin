'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Cookies from 'js-cookie';
import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function Home(): React.JSX.Element {
	const [form, setForm] = useState({ username: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [fadeOut, setFadeOut] = useState(false);
	const router: AppRouterInstance = useRouter();

	// Check for token on component mount and redirect if exists
	useEffect(() => {
		const token: string | undefined = Cookies.get('authToken');
		if (token) {
			router.push('/dashboard');
		}
	}, [router]);

	const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit: (e) => Promise<void> = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const loginData = {
				username: form.username,
				email: '',
				phoneNumber: '',
				password: form.password,
			};
			console.log('Wysyłane dane:', loginData);

			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginData),
			});

			console.log('Status odpowiedzi:', response.status);
			if (response.status === 200) {
				const data = await response.json();
				console.log('Dane odpowiedzi:', data);
				Cookies.set('authToken', data.token, { expires: 1 });
				setFadeOut(true);
				setTimeout(() => {
					router.push('/dashboard');
				}, 300);
			} else {
				const errorData = await response.json();
				console.log('Błąd odpowiedzi:', errorData);
				setError(
					errorData.message || 'Błędna nazwa użytkownika lub hasło'
				);
				setLoading(false);
			}
		} catch (err) {
			console.error('Błąd podczas logowania:', err);
			setError('Wystąpił błąd podczas logowania');
			setLoading(false);
		}
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-[#232323]'>
			<motion.div
				initial={{ opacity: 1 }}
				animate={{ opacity: fadeOut ? 0 : 1 }}
				transition={{ duration: 0.3 }}
				className='w-96 rounded-xl border-2 border-[#ab2337] bg-[#2c2b2b] p-8 text-white shadow-lg'
			>
				<div className='mb-6 flex justify-center'>
					<Image
						src='/logo-admin.png'
						alt='inPolex Admin'
						width={150}
						height={0}
						priority
						style={{ width: '100%', height: 'auto' }}
						layout='responsive'
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
						disabled={loading}
					/>
					<input
						type='password'
						name='password'
						placeholder='Password'
						className='rounded border border-[#2c2b2b] bg-[#232323] p-3 text-white focus:border-[#ab2337] focus:outline-none'
						value={form.password}
						onChange={handleChange}
						required
						disabled={loading}
					/>

					<motion.button
						type='submit'
						whileTap={{ scale: 0.95 }}
						className='rounded border border-[#2c2b2b] bg-[#232323] py-3 font-semibold text-white transition hover:border-[#ab2337]'
						disabled={loading}
					>
						Sign in
					</motion.button>

					{loading && (
						<div className='mt-4 flex justify-center'>
							<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
						</div>
					)}

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
