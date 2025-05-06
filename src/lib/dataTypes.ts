export interface UsePostFetchProps<TRequest, TResponse> {
	post: (url: string, requestData?: TRequest) => Promise<void | TResponse>;
	data?: TResponse | null;
	error: string | null;
	loading: boolean;
}

export interface UseGetFetchProps<TResponse> {
	get: (url: string, token: string) => Promise<void | TResponse>;
	data: TResponse | null;
	error: string | null;
	loading: boolean;
}
