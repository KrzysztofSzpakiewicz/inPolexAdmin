'use client';
import useGetFetch from '@/lib/useGetFetch';
import React, { useEffect } from 'react';
import { DeliveryTimeType } from '../dataTypes';
import Cookies from 'js-cookie';
const token: string = Cookies.get('authToken') || '';
export default function DeliveryTimePage(): React.JSX.Element {
	const { get: getArchived, data: archivedData } =
		useGetFetch<DeliveryTimeType[]>();
	const { get: getActive, data: activeData } =
		useGetFetch<DeliveryTimeType[]>();
	const [archivedDeliveryTimes, setArchivedDeliveryTimes] = React.useState<
		DeliveryTimeType[]
	>([]);
	const [activeDeliveryTimes, setActiveDeliveryTimes] = React.useState<
		DeliveryTimeType[]
	>([]);
	// const [isNewModalOpen, setIsNewModalOpen] = React.useState<boolean>(false);
	// const [isEditModalOpen, setIsEditModalOpen] =
	// 	React.useState<boolean>(false);

	useEffect(() => {
		getArchived('/api/system-parameter/delivery-time?active=false', token);
		getActive('/api/system-parameter/delivery-time?active=true', token);
	}, [getArchived, getActive]);

	useEffect(() => {
		setArchivedDeliveryTimes(archivedData || []);
	}, [archivedData]);

	useEffect(() => {
		setActiveDeliveryTimes(activeData || []);
	}, [activeData]);

	console.log('Archived delivery times:', archivedDeliveryTimes);
	console.log('Active delivery times:', activeDeliveryTimes);

	return <div className=''>aa</div>;
}
