// import React, { useEffect } from 'react';
// import { DeliveryTimeProps, DeliveryTimeType } from '../dataTypes';
// import useGetFetch from '@/lib/useGetFetch';
// export default function DeliveryTimeTab({
// 	token,
// 	onSetIsLoading,
// 	onSetError,
// }: DeliveryTimeProps): React.JSX.Element {
// 	const { get, data, error, loading } = useGetFetch<DeliveryTimeType[]>();

// 	useEffect(() => {
// 		get(
// 			'/api/system-parameter/delivery-time?active=true&page=0&size=10',
// 			token
// 		);
// 	}, [get, token]);

// 	useEffect(() => {
// 		onSetIsLoading?.(loading);
// 		if (error !== null) {
// 			onSetError?.(error);
// 		}
// 	}, [loading, onSetIsLoading, onSetError, error]);
// 	console.log('data', data);

// 	const [showEditModal, setShowEditModal] = React.useState(false);
// 	const [showHistoryModal, setShowHistoryModal] = React.useState(false);
// 	return (
// 		<div className=''>
// 			<div className=''>aaa</div>
// 		</div>
// 	);
// }
