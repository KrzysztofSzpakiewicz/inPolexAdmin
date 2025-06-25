export type User = {
	id: number;
	firstName: string;
	lastName: string;
	userName: string;
	phoneNumber: string;
	email: string;
};

export type Address = {
	id: number;
	country: string;
	city: string;
	street: string;
	number: string;
	postalCode: string;
	apartment: string;
	latitude: number;
	longitude: number;
};

export type PackageDimensions = {
	width: number;
	height: number;
	depth: number;
};

export type PackageSize = {
	id: number;
	size: string;
	price: number;
	maxWeight: number;
	dimensions: PackageDimensions;
	active: boolean;
	createdAt: string;
};

export type DeliveryTime = {
	id: number;
	workDaysAmount: number;
	price: number;
	active: boolean;
	createdAt: string;
};

export type FetchedPackages = {
	id: number;
	sender: User;
	senderAddress: Address;
	createdAt: string;
	packageSize: PackageSize;
	price: number;
	receiver: User;
	receiverAddress: Address;
	plannedDeliveryDate: string;
	deliveryTime: DeliveryTime;
	packageStatus: PackageStatus;
};

export type PackageStatus =
	| 'INITIALIZED'
	| 'CREATED'
	| 'PENDING'
	| 'ASSIGNED_TO_COURIER'
	| 'IN_TRANSIT'
	| 'DELIVERED'
	| 'FAILED'
	| 'RETURNED';

export interface PackageProps {
	data: FetchedPackages;
}

export interface PackageUsersDetailsProps {
	userData: User;
	addressData: Address;
}
