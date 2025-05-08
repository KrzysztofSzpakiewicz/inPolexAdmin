'use client';
import React from 'react';
import { UsePostFetchProps } from './dataTypes';
import Cookies from 'js-cookie';
const token: string | undefined = Cookies.get('authToken');
export default function usePostFetch<TRequest, TResponse>(): UsePostFetchProps<
	TRequest,
	TResponse
> {
	const [data, setData] = React.useState<TResponse | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);

	const post: (url: string, requestData?: TRequest) => Promise<void> = async (
		url: string,
		requestData?: TRequest
	): Promise<void> => {
		setLoading(true);
		try {
			const response: Response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: requestData ? JSON.stringify(requestData) : undefined,
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const responseData: TResponse = await response.json();
			console.log('Response data:', responseData);

			setData(responseData);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return { post, data, error, loading };
}
