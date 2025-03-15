import Image from 'next/image';
import React, { JSX } from 'react';
interface DashboardButtonProps {
	onClick: () => void;
	imgSrc: string;
	imgAlt: string;
	buttonText: string;
	selectedContent: string;
	actualContent: string | null;
}

export default function DashboardButton({
	onClick,
	imgSrc,
	imgAlt,
	buttonText,
	selectedContent,
	actualContent,
}: DashboardButtonProps): JSX.Element {
	return (
		<>
			<button
				onClick={onClick}
				className='flex items-center gap-2 rounded p-3 transition'
			>
				<Image width={36} height={36} src={imgSrc} alt={imgAlt} />
				<span
					className={`font-montserrat after:bg-red relative text-xl font-semibold after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:transition-all after:duration-300 ${
						selectedContent === actualContent
							? 'after:scale-x-100'
							: 'after:scale-x-0 hover:after:scale-x-100'
					}`}
				>
					{buttonText}
				</span>
			</button>
		</>
	);
}
