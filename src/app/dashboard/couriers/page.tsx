'use client';
import Select from '@/components/Select';
import React from 'react';
import { CourierSelectOptionsTypes, GetCourierResponse } from './dataTypes';
import Cookies from 'js-cookie';
import useGetFetch from '@/lib/useGetFetch';
import Courier from './components/Courier';
import Link from 'next/link';
const token: string = Cookies.get('authToken') || '';
export default function Couriers(): React.JSX.Element {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [selectedCourierArea, setSelectedCourierArea] =
		React.useState<string>('KAT');
	const [reFetch, setReFetch] = React.useState<boolean>(false);
	const courierOptions: CourierSelectOptionsTypes = [
		{ value: 'KAT', label: 'KAT' },
		{ value: 'GDA', label: 'GDA' },
		{ value: 'WAR', label: 'WAR' },
		{ value: 'POZ', label: 'POZ' },
	];

	const { get, data, loading } = useGetFetch<GetCourierResponse[]>();

	// React.useEffect(() => {
	// 	get(`/api/courier?area=${selectedCourierArea}?size=20`, token);
	// 	setReFetch(false);
	// }, [get, reFetch, selectedCourierArea]);
	React.useEffect(() => {
		get('/api/courier?size=20', token);
		setReFetch(false);
	}, [get, reFetch, selectedCourierArea]);

	React.useEffect(() => {
		setIsLoading(loading);
	}, [loading]);
	console.log(selectedCourierArea);

	console.log('data', data);

	return (
		<div className='flex flex-col gap-4'>
			{isLoading && (
				<div className='bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black'>
					<div className='mt-4 flex justify-center'>
						<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
					</div>
				</div>
			)}
			<h2 className='font-montserrat text-light flex items-center text-xl font-bold'>
				COURIERS:
			</h2>
			<div className='flex'>
				<Select
					options={courierOptions}
					value={selectedCourierArea}
					onSelect={setSelectedCourierArea}
				/>
			</div>
			<div className='grid grid-cols-5 gap-4'>
				{data &&
					data.map((courier: GetCourierResponse) => (
						<Link
							className='w-full transition hover:scale-105'
							href={{
								pathname: `/dashboard/couriers/${courier.id}`,
							}}
							key={courier.id}
						>
							<Courier data={courier} />
						</Link>
					))}
			</div>
		</div>
	);
}
