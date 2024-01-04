import { createContext, ReactNode } from "react";
import { Auth, defaultAuth, defaultAuthContext } from "../utils/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Props = {
	children: ReactNode;
};

type AuthContext = {
	auth: Auth;
	setAuth: React.Dispatch<React.SetStateAction<Auth>>;
};

export const AuthContext = createContext<AuthContext>(defaultAuthContext);

const AuthProvider = ({ children }: Props) => {
	// Instead of useState, I could also use localStorage hook from Chapter 4, to prevent a hard reload
	const [auth, setAuth] = useLocalStorage<Auth>("auth", defaultAuth);
	// const [auth, setAuth] = useState<Auth>(defaultAuth);
	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
