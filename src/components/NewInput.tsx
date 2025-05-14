import React from 'react';

interface InputComponentProps<T extends string | number> {
	value: T;
	onChange: React.Dispatch<React.SetStateAction<T>>;
	isDisabled?: boolean;
	required?: boolean;
	placeholder?: string;
	isPassword?: boolean;
	labelWidth?: string;
	inputWidth?: string;
	max?: number;
}

export default function InputComponent<T extends string | number>({
	value,
	onChange,
	isDisabled = false,
	required = false,
	placeholder = '',
	isPassword = false,
	labelWidth = 'w-40',
	inputWidth = 'w-64',
	max = undefined,
}: InputComponentProps<T>): React.JSX.Element {
	const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		const raw: string = e.target.value;
		// jeśli to ma być number, rzutujemy; w przeciwnym razie traktujemy jako string
		const newValue: T =
			typeof value === 'number' ? (Number(raw) as T) : (raw as T);
		onChange(newValue);
	};

	return (
		<div className='flex items-center gap-4'>
			<label className={`font-montserrat text-light mb-0 ${labelWidth}`}>
				{placeholder}:
			</label>
			<div className={`group relative ${inputWidth}`}>
				<input
					type={
						isPassword
							? 'password'
							: typeof value === 'number'
								? 'number'
								: 'text'
					}
					value={value}
					onChange={handleChange}
					disabled={isDisabled}
					required={required}
					placeholder={placeholder}
					max={max}
					className='ext-light w-full border-b-2 bg-transparent px-2 py-1 placeholder-neutral-400 focus:outline-none'
				/>
				<span className='bg-red absolute bottom-0 left-0 h-0.5 w-0 rounded transition-all duration-300 group-focus-within:w-full' />
			</div>
		</div>
	);
}
