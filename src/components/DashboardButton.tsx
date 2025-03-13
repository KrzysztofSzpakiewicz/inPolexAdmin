interface DashboardButtonProps {
	onClick: () => void;
	imgSrc: string;
	imgAlt: string;
	buttonText: string;
	selectedContent: string
	actualContent: string;
}

export default function DashboardButton({ onClick, imgSrc, imgAlt, buttonText, selectedContent, actualContent }: DashboardButtonProps) {
	return (
		<>
			<button
				onClick={onClick}
				className='flex items-center gap-2 rounded p-3 transition'
			>
				<img src={imgSrc} alt={imgAlt} />
				<span className={`relative font-montserrat font-semibold text-xl after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] 
					after:bg-red after:transition-all after:duration-300 ${selectedContent === actualContent ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
					}`}
					>
				{buttonText}
	</span>
	</button>
</>
	)
}