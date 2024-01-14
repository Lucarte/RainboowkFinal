export type Auth = {
	id: number | null;
	username: string | null;
	isAdmin: boolean | null;
	isAuthenticated: boolean | null;
};

export const defaultAuth: Auth = {
	id: null,
	username: null,
	isAdmin: null,
};

export const defaultAuthContext = {
	auth: defaultAuth,
	setAuth: () => {},
};
