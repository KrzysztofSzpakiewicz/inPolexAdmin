'use client';
import { InputChangeEventType } from '@/app/dataTypes';
import React from 'react';

interface InputProps {
	value: string;
	placeholder: string;
	isPassword?: boolean;
	type: string;
	onChange: (value: string) => void;
}

export default function Input({
	value,
	placeholder,
	type,
	onChange,
}: InputProps): React.JSX.Element {
	const handleChange: (e: InputChangeEventType) => void = (
		e: InputChangeEventType
	) => {
		const value: string = e.target.value;
		onChange(value);
	};

	return (
		<div className='flex items-center gap-4'>
			<label className='font-montserrat text-light mb-0 w-40'>
				{placeholder}:
			</label>
			<div className='group relative w-64'>
				<input
					type={type}
					value={value}
					onChange={handleChange}
					className='text-light w-64 border-b-2 bg-transparent px-2 py-1 placeholder-neutral-400 focus:outline-none'
					placeholder={`${placeholder}...`}
					required
				/>
				<span className='bg-red absolute bottom-0 left-0 h-0.5 w-0 rounded transition-all duration-300 group-focus-within:w-full' />
			</div>
		</div>
	);
}
