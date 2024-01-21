// import { createContext, ReactNode, useContext } from "react";
// import { useState, useCallback } from "react";
// export type FormFunctions = {
// 	isFormVisible: boolean;
// 	openForm: () => void;
// 	closeForm: () => void;
// 	handleCheckForm: (
// 		checkFunction: (...args: unknown[]) => Promise<boolean>,
// 		...args: unknown[]
// 	) => void;
// };

// const GeneralFormContext = createContext<FormFunctions | undefined>(undefined);

// interface GeneralFormProviderProps {
// 	children: ReactNode;
// }

// export const GeneralFormProvider: React.FC<GeneralFormProviderProps> = ({
// 	children,
// }: GeneralFormProviderProps) => {
// 	const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

// 	const openForm = useCallback(() => {
// 		setIsFormVisible(true);
// 	}, []);

// 	const closeForm = useCallback(() => {
// 		setIsFormVisible(false);
// 	}, []);

// 	const handleCheckForm = useCallback(
// 		async (
// 			checkFunction: (...args: unknown[]) => Promise<boolean>,
// 			...args: unknown[]
// 		) => {
// 			// Call the provided check function
// 			const result = await checkFunction(...args);

// 			// Set the form visibility based on the result
// 			setIsFormVisible(!result);
// 		},
// 		[]
// 	);

// 	const formFunctions: FormFunctions = {
// 		isFormVisible,
// 		openForm,
// 		closeForm,
// 		handleCheckForm,
// 	};

// 	return (
// 		<GeneralFormContext.Provider value={formFunctions}>
// 			{children}
// 		</GeneralFormContext.Provider>
// 	);
// };

// export const useGeneralFormContext = () => {
// 	const context = useContext(GeneralFormContext);

// 	if (!context) {
// 		throw new Error(
// 			"useGeneralFormContext must be used within a GeneralFormProvider"
// 		);
// 	}

// 	return context;
// };

// export { GeneralFormContext };
// GeneralFormContext.tsx

// GeneralFormContext.tsx
import { useState, useCallback, createContext, ReactNode } from "react";

interface GeneralFormContextProps {
	children: ReactNode;
}

interface GeneralFormContextValue {
	isFormVisible: boolean;
	openForm: () => void;
	closeForm: () => void;
	handleCheckForm: (
		checkFunction: (...args: unknown[]) => Promise<boolean>,
		...args: unknown[]
	) => void;
}

export const GeneralFormContext = createContext<
	GeneralFormContextValue | undefined
>(undefined);

export const GeneralFormProvider: React.FC<GeneralFormContextProps> = ({
	children,
}: GeneralFormContextProps) => {
	const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

	const openForm = useCallback(() => {
		setIsFormVisible(true);
	}, []);

	const closeForm = useCallback(() => {
		setIsFormVisible(false);
	}, []);

	const handleCheckForm = useCallback(
		async (
			checkFunction: (...args: unknown[]) => Promise<boolean>,
			...args: unknown[]
		) => {
			const result = await checkFunction(...args);
			setIsFormVisible(!result);
		},
		[]
	);

	const contextValue: GeneralFormContextValue = {
		isFormVisible,
		openForm,
		closeForm,
		handleCheckForm,
	};

	return (
		<GeneralFormContext.Provider value={contextValue}>
			{children}
		</GeneralFormContext.Provider>
	);
};
