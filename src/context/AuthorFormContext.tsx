import React, { createContext, useContext, ReactNode, useState } from "react";

type AuthorFormContextType = {
	authorDataSaved: () => void;
	isAuthorFormVisible: boolean;
	setIsAuthorFormVisible: (isVisible: boolean) => void;
};

const AuthorFormContext = createContext<AuthorFormContextType | undefined>(
	undefined
);

export const AuthorFormProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isAuthorFormVisible, setIsAuthorFormVisible] = useState(false);

	const authorDataSaved = () => {
		setIsAuthorFormVisible(false);
	};

	return (
		<AuthorFormContext.Provider
			value={{ authorDataSaved, isAuthorFormVisible, setIsAuthorFormVisible }}>
			{children}
		</AuthorFormContext.Provider>
	);
};

export const useAuthorFormContext = () => {
	const context = useContext(AuthorFormContext);
	if (!context) {
		throw new Error(
			"useAuthorFormContext must be used within an AuthorFormProvider"
		);
	}
	return context;
};
