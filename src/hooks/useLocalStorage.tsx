import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Return<T> = [T, Dispatch<SetStateAction<T>>];

const getValueFromLocalStorage = <T,>(key: string, initialValue: T): T => {
	const storedValue = localStorage.getItem(key);
	if (storedValue !== null) {
		try {
			return JSON.parse(storedValue) as T;
		} catch (error) {
			console.error("Error parsing localStorage value:", error);
		}
	}
	return initialValue;
	// // If the key already exists in the LocalStorage ?? we return it, otherwise we return the initialValue
	// let stateByLocal = "";
	// // Either a string or null
	// const localValue = localStorage.getItem(key);
	// // if truthy AND if not equal to null...
	// if (localValue && localValue !== null) {
	// 	stateByLocal = localValue;
	// } else {
	// 	stateByLocal = initialValue;
	// }
	// return stateByLocal;
};

export const useLocalStorage = <T,>(
	key: string,
	initialValue: T
): Return<T> => {
	const [value, setValue] = useState<T>(() =>
		getValueFromLocalStorage(key, initialValue)
	);

	useEffect(() => {
		try {
			const serializedValue = JSON.stringify(value);
			localStorage.setItem(key, serializedValue);
		} catch (error) {
			console.error("Error serializing localStorage value:", error);
		}
	}, [key, value]);

	return [value, setValue];
};

// This version uses generics (<T>) to make the hook flexible for different types. It serializes and deserializes values using JSON.stringify and JSON.parse to ensure proper handling of complex types like your Auth type.

// HOW IT WAS BEFORE
// // const [search, setSearch] = useLocalStorage('bookSearch', 'initialValue')
// export const useLocalStorage = (key: string, initialValue: any): Return => {
// 	const [value, setValue] = useState(() => {
// 		return getValueFromLocalStorage(key, initialValue);
// 	});

// 	useEffect(() => {
// 		localStorage.setItem(key, value);
// 	}, [value]);

// 	return [value, setValue];
// };
