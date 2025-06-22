/* eslint-disable */
'use client';
import useGetFetch from '@/lib/useGetFetch';
import React, { useEffect } from 'react';
import { FetchedPackages } from './dataTypes';
import Cookies from 'js-cookie';
const token: string = Cookies.get('authToken') || '';
export default function Packages(): React.JSX.Element {
	return (
		<div>
			Content 3 - podgląd paczek zakonczonych, aktualnie dostarczanych,
			nie przetworzonych, wygodne przypisanie wielu paczek do jednego
			kuriera
		</div>
	);
}
