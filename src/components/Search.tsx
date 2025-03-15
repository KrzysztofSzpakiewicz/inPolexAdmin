'use client';
import React, { useState } from 'react';

interface SearchProps {
	onSearch: (query: string) => void;
	placeholder?: string;
}

export default function Search({
	onSearch,
	placeholder = 'Search...',
}: SearchProps): React.JSX.Element {
	const [quary, setQuary] = useState('');

	const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setQuary(e.target.value);
		onSearch(e.target.value);
	};

	return (
		<div className='border-red mr-2 border-b-2 py-2 pr-4 pl-2 font-sans'>
			<input
				type='text'
				value={quary}
				onChange={handleChange}
				placeholder={placeholder}
				className=''
			/>
		</div>
	);
}
