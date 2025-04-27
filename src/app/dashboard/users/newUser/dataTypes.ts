import React from 'react';
export type InputChangeEventType = React.ChangeEvent<HTMLInputElement>;
export type SelectChangeEventType = React.ChangeEvent<HTMLSelectElement>;

export type NewUserType = {
	firstName: string;
	lastName: string;
	userName: string;
	password: string;
	phoneNumber: string | null;
	email: string;
	verified: boolean;
	role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_COURIER';
};
