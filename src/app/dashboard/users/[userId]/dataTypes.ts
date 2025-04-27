export interface UserFromServerType {
	id: number;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	phoneNumber: string;
	role: string;
	verified: boolean;
	address: AddressFromServerType[];
}

export interface AddressFromServerType {
	id?: number;
	country: string;
	city: string;
	street: string;
	number: string;
	postalCode: string;
	apartment: string;
	latitude?: number;
	longitude?: number;
}

export interface AddressPropsType {
	address: AddressFromServerType;
}

export interface UserDetailsPropsType {
	userData: UserFromServerType;
}

export interface EditUserModalPropsType {
	userData: UserFromServerType;
	onClose: () => void;
	onUpdateUser: (userDetails: UserFromServerType) => void;
}
export interface AddressLabelType {
	country: string;
	city: string;
	street: string;
	number: string;
	apartment: string;
	postalCode: string;
}

export interface AddressType {
	id: number;
	country: string;
	city: string;
	street: string;
	apartment: string;
	latitude: number;
	longitude: number;
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

export interface NotModifiedUserDataType {
	id: number;
	userName: string;
	email: string;
}

export interface ModifableUserDataType {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	verified: boolean;
	role: string;
	address: AddressType[];
}
export interface LabelAdresType {
	country: string;
	city: string;
	street: string;
	number: string;
	postalCode: string;
	apartment: string;
}
