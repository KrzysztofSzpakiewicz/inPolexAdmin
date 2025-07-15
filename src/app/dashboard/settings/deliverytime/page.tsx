'use client';
import useGetFetch from '@/lib/useGetFetch';
import React, { useEffect } from 'react';
import {
	DeliveryTimeType,
	NewDeliveryTimeResponse,
	NewDeliveryTimeType,
} from '../dataTypes';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import NewDeliveryTimeModal from './components/NewDeliveryTimeModal';
import usePostFetch from '@/lib/usePostFetch';
import EditDeliveryTimeModal from './components/EditDeliveryTimeModal';
import ArchiveDeliveryTime from './components/ArchiveDeliveryTime';
const token: string = Cookies.get('authToken') || '';
export default function DeliveryTimePage(): React.JSX.Element {
	const router: AppRouterInstance = useRouter();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [isNewModalOpen, setIsNewModalOpen] = React.useState<boolean>(false);
	const [isEditModalOpen, setIsEditModalOpen] =
		React.useState<boolean>(false);
	const [reFetch, setReFetch] = React.useState<boolean>(false);
	const [selectedDeliveryTime, setSelectedDeliveryTime] =
		React.useState<DeliveryTimeType | null>(null);
	const {
		get: getArchived,
		data: archivedData,
		loading: archivedLoading,
	} = useGetFetch<DeliveryTimeType[]>();

	const {
		get: getActive,
		data: activeData,
		loading: activeLoading,
	} = useGetFetch<DeliveryTimeType[]>();

	const { post, loading: postLoading } = usePostFetch<
		NewDeliveryTimeType,
		NewDeliveryTimeResponse
	>();

	useEffect(() => {
		getArchived('/api/system-parameter/delivery-time?active=false', token);
		getActive(
			'/api/system-parameter/delivery-time?active=true&size=20',
			token
		);
		setReFetch(false);
	}, [getArchived, getActive, reFetch]);

	useEffect(() => {
		setIsLoading(archivedLoading || activeLoading);
	}, [archivedLoading, activeLoading, postLoading]);
	console.log(activeData, 'activeData');

	const handleSetNewData: (workDaysAmount: number, price: number) => void = (
		workDaysAmount: number,
		price: number
	) => {
		const payload: NewDeliveryTimeType = {
			workDaysAmount,
			price,
		};
		post('/api/system-parameter/delivery-time', payload);
		setReFetch(true);
		setIsNewModalOpen(false);
	};

	const handleDeleteSelected: (id: number) => void = (id: number) => {
		post(`/api/system-parameter/delivery-time/${id}`);
		setReFetch(true);
	};

	const handleSelectEdit: (deliveryTime: DeliveryTimeType) => void = (
		deliveryTime: DeliveryTimeType
	) => {
		setSelectedDeliveryTime(deliveryTime);
		setIsEditModalOpen(true);
	};

	const handleSetData: (updatedData: DeliveryTimeType) => void = (
		updatedData: DeliveryTimeType
	) => {
		post('/api/system-parameter/delivery-time/', {
			workDaysAmount: updatedData.workDaysAmount,
			price: updatedData.price,
		});
		post(`/api/system-parameter/delivery-time/${updatedData.id}`);
		setReFetch(true);
		setIsEditModalOpen(false);
	};
	return (
		<div className='flex flex-col gap-2'>
			{isLoading && (
				<div className='bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black'>
					<div className='mt-4 flex justify-center'>
						<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
					</div>
				</div>
			)}
			{isEditModalOpen && selectedDeliveryTime && (
				<EditDeliveryTimeModal
					deliveryData={selectedDeliveryTime}
					onCancel={() => setIsEditModalOpen(false)}
					onSetData={handleSetData}
				/>
			)}
			{isNewModalOpen && activeData && (
				<NewDeliveryTimeModal
					onCancel={() => setIsNewModalOpen(false)}
					onSetData={handleSetNewData}
					deliveryTimeData={activeData}
				/>
			)}
			<div className='flex flex-row items-center justify-between'>
				<div
					className='flex items-center gap-2 font-bold transition hover:scale-105'
					onClick={() => router.back()}
				>
					<Image
						alt='arrowBack'
						src='/arrows/arrowBack.svg'
						width={32}
						height={32}
					/>
					GO BACK
				</div>
				<div
					className='bg-red font-montserrat text-light rounded-xl px-4 py-2 font-semibold transition hover:scale-105'
					onClick={() => setIsNewModalOpen(true)}
				>
					ADD NEW
				</div>
			</div>
			<h1 className='mb-4 text-2xl font-bold'>PACKAGE SIZES SETTINGS</h1>
			<div className='flex w-full flex-row justify-between gap-4'>
				<div className='flex w-2/3 flex-col'>
					<h2>MODIFY DELIVERY TIME</h2>
					<div className='grid grid-cols-4 gap-4'>
						{activeData &&
							!isLoading &&
							activeData
								.slice()
								.sort(
									(
										a: DeliveryTimeType,
										b: DeliveryTimeType
									) => a.workDaysAmount - b.workDaysAmount
								)
								.map((deliverytime: DeliveryTimeType) => (
									<div
										className='border-red flex flex-col gap-4 rounded-lg border-4 px-4 py-6 text-xl font-bold'
										key={deliverytime.id}
									>
										<div className='flex flex-col gap-2'>
											<div className='flex items-center gap-2'>
												DAYS:{' '}
												<span className='text-red text-2xl'>
													{
														deliverytime.workDaysAmount
													}
												</span>
											</div>
											<div className='flex items-center gap-2'>
												PRICE:{' '}
												<span className='text-red text-2xl'>
													{deliverytime.price}
												</span>
											</div>
										</div>
										<div className='flex items-center justify-between gap-2 text-sm'>
											<div
												onClick={() =>
													handleSelectEdit(
														deliverytime
													)
												}
												className='text-light bg-red flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl p-2 transition hover:scale-105'
											>
												EDIT
											</div>
											<div
												onClick={() =>
													handleDeleteSelected(
														deliverytime.id
													)
												}
												className='text-light bg-red flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl p-2 transition hover:scale-105'
											>
												DELETE
											</div>
										</div>
									</div>
								))}
					</div>
				</div>
				<div className='flex w-2/5 flex-col'>
					<h2>ARCHIVED DELIVERY TIME</h2>
					<ArchiveDeliveryTime data={archivedData || []} />
				</div>
			</div>
		</div>
	);
}
