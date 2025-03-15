import React from 'react';

interface DashboardItemProps {
	content: string;
	value: number;
}

export default function DashboardItem({
	content,
	value,
}: DashboardItemProps): React.JSX.Element {
	const word: string[] = content.split(' ');
	return (
		<div className='border-red flex max-h-48 max-w-64 flex-col justify-between rounded-lg border-4 p-4'>
			<p className='flex flex-col leading-8'>
				<span className='text-red text-[32px] font-bold'>
					{word[0]}
				</span>
				<span className='text-[24px] font-semibold'>
					{word.slice(1).join(' ')}
				</span>
			</p>
			<div className='text-red w-full text-right text-[64px] font-bold'>
				{value}
			</div>
		</div>
	);
}
