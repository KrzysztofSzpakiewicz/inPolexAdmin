//data structures of parts of data structures types acquired from the backend
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
