export interface PackageSizeType {
	id?: number;
	maxWeight: number;
	price: number;
	size: string;
	active: boolean;
	dimensions: {
		depth: number;
		height: number;
		width: number;
	};
	createdAt?: string;
}
export interface PackageSizeTabProps {
	token: string;
	onSetIsLoading?: (loading: boolean) => void;
	onSetError?: (error: string) => void;
}
export interface PackageSizeModalProps {
	token: string;
	packageSize: PackageSizeType;
	onCancel: () => void;
	onSetIsLoading?: (loading: boolean) => void;
	onSetError?: (error: string) => void;
}

export interface PackageSizeHistoryModalProps {
	token: string;
	onCancel: () => void;
	onSetIsLoading?: (loading: boolean) => void;
	onSetError?: (error: string) => void;
}
export interface PackageSizeHistoryProps {
	data: PackageSizeType[];
}

export type PackageSizeResponse = {
	success: boolean;
	message: string;
};

export interface DeliveryTimeType {
	id: number;
	workDaysAmount: number;
	price: number;
	active: boolean;
	createdAt?: string | null;
}
export interface DeliveryTimeProps {
	token: string;
	onSetIsLoading?: (loading: boolean) => void;
	onSetError?: (error: string) => void;
}

export interface PackageSizeEditModalProps {
	data: PackageSizeType;
	onCancel: () => void;
	onSetData: (data: PackageSizeType) => void;
}
