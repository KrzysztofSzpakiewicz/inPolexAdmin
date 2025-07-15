'use client';
import React, { useCallback } from 'react';
import { UseGetFetchProps } from './dataTypes';

export default function useGetFetch<TResponse>(): UseGetFetchProps<TResponse> {
	const [data, setData] = React.useState<TResponse | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);

	const get: (url: string, token: string) => Promise<void> = useCallback(
		async (url: string, token: string): Promise<void> => {
			setLoading(true);
			setError(null);
			try {
				const response: Response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error('Błąd podczas pobierania danych.');
				}

				const { content }: { content: TResponse } =
					await response.json();

				setData(content);
			} catch (err) {
				console.error(err);
				setError('Wystąpił błąd podczas pobierania danych.');
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return { get, data, error, loading };
}
