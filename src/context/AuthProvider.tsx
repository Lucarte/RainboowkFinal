import { createContext, ReactNode, useState } from "react";
import { Auth, defaultAuth } from "../utils/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Props = {
	children: ReactNode;
};

type AuthContext = {
	auth: Auth;
	setAuth: React.Dispatch<React.SetStateAction<Auth>>;
	user: Auth | null;
	setUser: React.Dispatch<React.SetStateAction<Auth | null>>;
};

// Explicitly include user and setUser in the defaultAuthContext
export const defaultAuthContext: AuthContext = {
	auth: defaultAuth,
	setAuth: () => {},
	user: null,
	setUser: () => {},
};

export const AuthContext = createContext<AuthContext>(defaultAuthContext);

const AuthProvider = ({ children }: Props) => {
	// Instead of useState, I could also use localStorage hook from Chapter 4, to prevent a hard reload
	const [auth, setAuth] = useLocalStorage<Auth>("auth", defaultAuth);
	const [user, setUser] = useState<Auth | null>(null);
	// const [auth, setAuth] = useState<Auth>(defaultAuth);
	const contextValue = { auth, setAuth, user, setUser };

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
