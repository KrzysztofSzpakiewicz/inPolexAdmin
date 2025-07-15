'use client';
import DashboardItem from '@/components/DashboardItem';
import React from 'react';

interface DashboardItemProps {
	content: string;
	value: number;
}

/* DOMYŚLNIE POBIERANE Z BAZY PRZY ZAŁADNOWANIU */
const dashboardList: DashboardItemProps[] = [
	{ content: 'UNASSIGNED SHIPMENTS', value: 9 },
	{ content: 'TOTAL SHIPMENTS', value: 9 },
	{ content: 'TOTAL SHIPMENTS', value: 9 },
	{ content: 'WAITING FOR PICKUP', value: 9 },
	{ content: 'SHIPMENTS IN TRANSFER', value: 9 },
	{ content: 'SHIPMENTS ON THE WAY', value: 9 },
	{ content: 'TOTAL USERS', value: 9 },
	{ content: 'TOTAL EMPLOYES', value: 9 },
];

export default function Dashboard(): React.JSX.Element {
	return (
		<div className='flex w-auto'>
			<div className='grid w-auto grid-cols-3 gap-x-8 gap-y-16 p-8'>
				{dashboardList.map(
					(item: DashboardItemProps, index: number) => (
						<DashboardItem
							key={index}
							content={item.content}
							value={item.value}
						/>
					)
				)}
			</div>
		</div>
	);
}
