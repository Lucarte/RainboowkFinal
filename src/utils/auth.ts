export type Auth = {
	id: number | null;
	username: string;
	user: {
		id: number;
		username: string;
		email: string;
	} | null;
	isAdmin: boolean | null;
	isAuthenticated: boolean | null;
};

export type User = {
	id: number;
	username: string;
	email: string;
};

export const defaultAuth: Auth = {
	id: 0,
	user: null,
	username: "",
	isAdmin: null,
	isAuthenticated: null,
};

export const defaultAuthContext = {
	auth: defaultAuth,
	setAuth: () => {},
};
