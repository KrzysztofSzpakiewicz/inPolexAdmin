export interface Address {
	country: string;
	city: string;
	street: string;
	number: string;
	postalCode: string;
	apartment: string;
	latitude?: number;
	longitude?: number;
}

export interface AddressModalProps {
	initialAddress?: Address;
	onSave: (address: Address) => void;
	onCancel: () => void;
	onSelectMap: (address: Address) => void;
}

export interface MapModalProps {
	initialAddress?: Address;
	onAccept: (address: Address) => void;
	onCancel: () => void;
}

export interface UserAddressesProps {
	addresses: Address[];
	onAddressesChange: (addresses: Address[]) => void;
}

export interface AddressLabelType {
	country: string;
	city: string;
	street: string;
	number: string;
	apartment: string;
	postalCode: string;
}
