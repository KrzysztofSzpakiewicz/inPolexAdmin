//page.tsx
export type CourierSelectOptionsTypes = {
	value: string;
	label: string;
}[];

//page.tsx
export interface GetCourierResponse {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	area?: string;
	assignedPackagesCount: number;
	maxPackages: number;
}

//components/Courier.tsx
export interface CourierProps {
	data: GetCourierResponse;
}

//[ourierId]/page.tsx
export type Stats = {
	totalDeliveredPackages: number;
	pendingPackages: number;
	packagesByStatus: {
		[key: string]: number;
	};
	packagesByArea: {
		[key: string]: number;
	};
};

//[courierId]/page.tsx
export type CourierType = {
	id: number;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	area: string;
	assignedPackagesCount: number;
	maxPackages: number;
	stats: Stats;
};

//[courierId]/page.tsx
export type CourierPackageType = {
	courierId: number;
	courierName: string;
	packages: PackageType[];
};

//[courierId]/page.tsx
export type PackageType = {
	id: number;
	receiverName: string;
	address: string;
	plannedDeliveryDate: string;
	status: string;
};

//[courierId]/components/CourierDetails.tsx
export interface CourierDetailsProps {
	phoneNumber: string;
	area: string;
	assignedPackagesCount: number;
	maxPackages: number;
}

//[courierId]/components/PackagesDetails.tsx
export interface PackagesDetailsProps {
	stats: Stats;
}

//[courierId]/components/PackagesAssignedToCourier.tsx
export interface PackagesAssignedToCourierProps {
	packages: PackageType[];
}
