'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React from 'react';

const defaultIcon = L.icon({
	iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

function LocationPicker({ onLocationSelect }) {
	useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng;
			fetch(
				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
			)
				.then((res) => res.json())
				.then((data) => {
					onLocationSelect({
						lat,
						lng,
						address: data.display_name || 'Unknown address',
					});
				});
		},
	});
	return null;
}

export default function MapModal({
	onClose,
	onConfirm,
	initialLocations = [],
}) {
	const [locations, setLocations] =
		useState<{ lat: number; lng: number; address: string }[]>(
			initialLocations
		);

	const handleLocationSelect = (location) => {
		setLocations((prev) => [...prev, location]);
	};

	const handleMarkerClick = (indexToRemove) => {
		setLocations((prev) =>
			prev.filter((_, index) => index !== indexToRemove)
		);
	};

	return (
		<div className='bg-opacity-75 fixed inset-0 flex items-center justify-center bg-black p-4'>
			<div className='w-full max-w-2xl rounded-lg bg-black p-6 text-white'>
				<h2 className='mb-4 text-xl font-bold'>Select Locations</h2>
				<MapContainer
					center={[50.2649, 19.0238]} // Katowice coordinates
					zoom={13}
					className='h-96 w-full'
				>
					<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
					<LocationPicker onLocationSelect={handleLocationSelect} />
					{locations.map((loc, index) => (
						<Marker
							key={index}
							position={[loc.lat, loc.lng]}
							icon={defaultIcon}
							eventHandlers={{
								click: () => handleMarkerClick(index),
							}}
						/>
					))}
				</MapContainer>
				<ul className='mt-4 max-h-40 overflow-y-auto'>
					{locations.map((loc, index) => (
						<li key={index} className='py-1 text-sm'>
							{loc.address} ({loc.lat.toFixed(6)},{' '}
							{loc.lng.toFixed(6)})
						</li>
					))}
				</ul>
				<div className='mt-6 flex justify-end space-x-3'>
					<button
						onClick={onClose}
						className='rounded bg-gray-600 px-5 py-2 text-white hover:bg-gray-700'
					>
						Cancel
					</button>
					<button
						onClick={() => onConfirm(locations)}
						className='rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700'
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}
