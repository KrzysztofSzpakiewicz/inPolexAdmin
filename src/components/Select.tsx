import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Option {
	value: string;
	label: string;
}

interface SelectProps {
	options: Option[];
	onSelect?: (value: string) => void;
	value: string;
}

export default function Select({
	options,
	onSelect,
	value,
}: SelectProps): React.JSX.Element {
	const [selected, setSelected] = useState<Option | undefined>(
		options.find((option: Option) => option.value === value)
	);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setSelected(options.find((option: Option) => option.value === value));
	}, [options, value]);

	const handleSelect: (option: Option) => void = (option: Option): void => {
		setSelected(option);
		setIsOpen(false);
		if (onSelect) {
			onSelect(option.value);
		}
	};

	return (
		<div className='border-red relative mr-2 w-40 border-b-2'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex h-full w-full items-center justify-between p-0.5'
			>
				{selected?.label}
				<Image
					src='/arrows/arrowDown.svg'
					alt='arrowDown'
					width={24}
					height={24}
				/>
			</button>
			{isOpen && (
				<ul className='bg-darkGray absolute mt-1 w-full'>
					{options.map((option: Option) => (
						<li
							key={option.value}
							className='hover:bg-lightGray border-lightGray cursor-pointer border-b-3 p-3 text-sm'
							onClick={() => handleSelect(option)}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
