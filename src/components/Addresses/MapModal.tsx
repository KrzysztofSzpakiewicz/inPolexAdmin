'use client';

import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Address, MapModalProps } from './dataTypes';

const defaultIcon: L.Icon<L.IconOptions> = L.icon({
	iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

function LocationMarker({
	position,
	onSelectLocation,
}: {
	position: [number, number];
	onSelectLocation: (lat: number, lng: number) => void;
}): React.JSX.Element {
	const map: L.Map = useMapEvents({
		click(e: L.LeafletMouseEvent) {
			onSelectLocation(e.latlng.lat, e.latlng.lng);
		},
	});
	useEffect(() => {
		map.setView(position, map.getZoom());
	}, [position, map]);
	return <Marker position={position} icon={defaultIcon} />;
}

export default function MapModal({
	initialAddress,
	onAccept,
	onCancel,
}: MapModalProps): React.JSX.Element {
	const [position, setPosition] = React.useState<[number, number]>(
		initialAddress?.latitude && initialAddress?.longitude
			? [initialAddress.latitude, initialAddress.longitude]
			: [50.2649, 19.0238]
	);
	const handleAccept: (e: React.MouseEvent<HTMLButtonElement>) => void = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		const fetchAddress: () => Promise<void> = async () => {
			const url: string = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position[0]},${position[1]}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
			try {
				const response: Response = await fetch(url);
				const data: {
					status: string;
					results: {
						address_components: {
							long_name: string;
							short_name: string;
							types: string[];
						}[];
					}[];
				} = await response.json();

				if (data.status === 'OK') {
					const addressComponents: Array<{
						types: string[];
						long_name: string;
					}> = data.results[0].address_components;

					const getComponent: (type: string) => string = (
						type: string
					): string =>
						addressComponents.find(
							(comp: { types: string[]; long_name: string }) =>
								comp.types.includes(type)
						)?.long_name || '';

					const newAddress: Address = {
						country: getComponent('country'),
						city: getComponent('locality'),
						street: getComponent('route'),
						number: getComponent('street_number'),
						postalCode: getComponent('postal_code'),
						apartment: initialAddress?.apartment || '',
						latitude: position[0],
						longitude: position[1],
					};

					onAccept(newAddress);
				}
			} catch (error) {
				console.error('Error fetching address:', error);
			}
		};
		fetchAddress();
	};

	return (
		<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
			<div className='bg-lightGray flex h-4/5 w-2/3 flex-col gap-8 rounded-lg p-8 shadow-lg'>
				<h2 className='text-light mb-4 text-center text-xl font-semibold'>
					CHOOSE FROM MAP
				</h2>
				<div className='h-full w-full'>
					<MapContainer
						center={position}
						zoom={
							initialAddress?.latitude &&
							initialAddress?.longitude
								? 16
								: 13
						}
						className='h-full w-full'
					>
						<TileLayer
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							attribution='&copy; inPolex'
						/>
						<LocationMarker
							position={position}
							onSelectLocation={(lat: number, lng: number) =>
								setPosition([lat, lng])
							}
						/>
					</MapContainer>
				</div>

				<div className='flex flex-row justify-center gap-4'>
					<button
						className='bg-red rounded px-4 py-2 font-bold text-white transition hover:bg-red-600'
						onClick={() => onCancel()}
					>
						CANCEL
					</button>
					<button
						className='bg-green rounded px-4 py-2 font-bold text-white transition hover:bg-green-600'
						onClick={handleAccept}
					>
						SAVE
					</button>
				</div>
			</div>
		</div>
	);
}
