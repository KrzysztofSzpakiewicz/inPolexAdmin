'use client';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import PackageSizeTab from './components/PackageSize/PackageSizeTab';
const token: string = Cookies.get('authToken') || '';
export default function Settings(): React.JSX.Element {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<div className='flex flex-col gap-4'>
			{isLoading && (
				<div className='bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black'>
					<div className='mt-4 flex justify-center'>
						<div className='h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-[#ab2337]'></div>
					</div>
				</div>
			)}
			<PackageSizeTab token={token} onSetIsLoading={setIsLoading} />
		</div>
	);
}
