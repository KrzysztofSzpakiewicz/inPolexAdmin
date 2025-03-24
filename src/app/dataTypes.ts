import React from 'react';

// types.ts

// Type alias for the form submission event

// Type alias for the input change event
export type InputChangeEventType = React.ChangeEvent<HTMLInputElement>;

// Interfaces for API responses
export interface LoginSuccessResponse {
	firstName: string;
	lastName: string;
	token: string;
}

export interface LoginData {
	username: string;
	email: string;
	phoneNumber: string;
	password: string;
}
