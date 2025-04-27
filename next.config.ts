import type { NextConfig } from 'next';
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*', // Wszystkie żądania do /api/... będą przekierowane
				destination: 'http://89.66.26.232:8080/:path*', // Przekieruj do backendu
			},
		];
	},
};

export default nextConfig;
