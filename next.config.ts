import type { NextConfig } from 'next';
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*', // Wszystkie żądania do /api/... będą przekierowane
				destination: 'http://20.199.73.154:8080/:path*', // Przekieruj do backendu
			},
		];
	},
};

export default nextConfig;
