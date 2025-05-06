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
}

export interface PackageSizeModalProps {
	token: string;
	packageSize: PackageSizeType;
	onCancel: () => void;
	onSetIsLoading?: (loading: boolean) => void;
	onSetError?: (error: string) => void;
}

export interface PackageSizeTabProps {
	token: string;
	onSetIsLoading?: (loading: boolean) => void;
	onSetError?: (error: string) => void;
}

export interface PackageSizeHistoryModalProps {
	token: string;
	onCancel: () => void;
	onSetIsLoading?: (loading: boolean) => void;
	onSetError?: (error: string) => void;
}

export type PackageSizeResponse = {
	success: boolean;
	message: string;
};
