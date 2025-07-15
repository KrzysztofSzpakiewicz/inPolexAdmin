'use client';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

const token: string | undefined = Cookies.get('authToken');

export default function Reports(): React.JSX.Element {
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

	const fetchPdf: () => Promise<void> = async () => {
		try {
			const url: string = `/api/report/pdf?from=${startDate}&to=${endDate}`;

			const response: Response = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: '*/*',
					Authorization: `Bearer ${token}`,
				},
			});

			const blob: Blob = await response.blob();
			const blobUrl: string = URL.createObjectURL(blob);
			console.log('PDF Blob URL:', blobUrl);

			setPdfBlobUrl(blobUrl);
		} catch (error) {
			console.error('Error fetching PDF:', error);
		}
	};
	const downloadPdf: () => void = () => {
		if (!pdfBlobUrl) return;

		const link: HTMLAnchorElement = document.createElement('a');
		link.href = pdfBlobUrl;
		link.download = `report_${startDate}_to_${endDate}.pdf`;
		document.body.appendChild(link);
		link.click();
		link.remove();
	};
	console.log('startDate:', startDate);
	console.log('endDate:', endDate);

	return (
		<div className='text-background flex flex-col'>
			<h2 className='text-xl font-bold'>Generate report:</h2>
			<div className='flex flex-row justify-between gap-2'>
				<div className='flex w-1/2 flex-col gap-2'>
					<h2>Provide start and end date:</h2>
					<div className='flex flex-col items-start gap-2'>
						<div className='flex flex-row gap-2'>
							<label htmlFor='startDate' className='min-w-32'>
								Start date:
							</label>
							<input
								type='date'
								name='startDate'
								id='startDate'
								value={startDate}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setStartDate(e.target.value)}
								className='date-input-light'
							/>
						</div>
						<div className='flex flex-row gap-2'>
							<label htmlFor='endDate' className='min-w-32'>
								End date:
							</label>
							<input
								type='date'
								name='endDate'
								id='endDate'
								value={endDate}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setEndDate(e.target.value)}
								className='date-input-light'
							/>
						</div>
						<div className='flex gap-2'>
							<button
								className={`rounded-2xl px-4 py-2 transition hover:scale-105 ${
									startDate && endDate
										? 'bg-red cursor-pointer hover:bg-red-600'
										: 'cursor-not-allowed bg-gray-500'
								}`}
								disabled={!startDate || !endDate}
								onClick={fetchPdf}
							>
								GENERATE REPORT
							</button>
							<button
								className={`rounded-2xl px-4 py-2 transition hover:scale-105 ${
									pdfBlobUrl
										? 'bg-red cursor-pointer hover:bg-red-600'
										: 'cursor-not-allowed bg-gray-500'
								}`}
								disabled={!pdfBlobUrl}
								onClick={downloadPdf}
							>
								DOWNLOAD REPORT
							</button>
						</div>
					</div>
				</div>
				<div className='w-1/2'>
					{pdfBlobUrl ? (
						<iframe
							src={pdfBlobUrl}
							width='100%'
							height='800px'
							title='PDF Preview'
						/>
					) : (
						<p>Loading PDF...</p>
					)}
				</div>
			</div>
		</div>
	);
}
