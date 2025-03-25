//data structures of parts of data structures types acquired from the backend

export type UserComponentType = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_COURIER';
};

export type UsersFromServerType = {
	content: Array<UserType>;
};

export type UserType = {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	phoneNumber: number | null;
	email: string;
	verified: boolean;
	role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_COURIER';
};
