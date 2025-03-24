export interface AddressType {
	id: number;
	country: string;
	city: string;
	street: string;
	number: number;
	postalCode: string;
}
export interface UserPackagesType {
	shipmentId: number;
	name: string;
	type: 'Incoming' | 'Outgoing';
	status: string;
}
//user type do zmiany a bardziej dodania elementow
export interface UserType {
	id: number;
	name: string;
	email: string;
	accountType: 'standard' | 'courier';
	addresses: AddressType[];
	packages: UserPackagesType[];
}
