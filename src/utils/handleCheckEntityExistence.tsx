import http from "./http";
import { useForm } from "react-hook-form";

type FormComponentProps = {
	onCloseForm: () => void;
	onOpenForm: () => void;
};

type FormComponent<T = object> = React.FC<T>;

export const handleCheckEntityExistence = async (
	form: ReturnType<typeof useForm>,
	entityIndex: number,
	arrayName: string,
	entityName: string,
	apiEndpoint: string,
	handleCheck: (
		checkFunction: (...args: unknown[]) => Promise<boolean>,
		...args: unknown[]
	) => Promise<void>,
	openForm: () => void,
	closeForm: () => void,
	FormComponent: FormComponent<FormComponentProps>
): Promise<boolean> => {
	const exists = await checkEntityExists(
		form,
		entityIndex,
		arrayName,
		entityName,
		apiEndpoint,
		handleCheck
	);

	// Update the visibility of the form based on the result
	if (!exists) {
		openForm();
	} else {
		console.log(
			`Great! ${entityName} exists already, and you need not enter details!`
		);
		closeForm();
	}

	return exists;
};

const checkEntityExists = async (
	form: ReturnType<typeof useForm>,
	index: number,
	arrayName: string,
	entityName: string,
	apiEndpoint: string,
	handleCheck: (
		checkFunction: (...args: unknown[]) => Promise<boolean>,
		...args: unknown[]
	) => Promise<void>,
	openForm: () => void,
	closeForm: () => void,
	FormComponent?: React.ComponentType<FormComponentProps>
): Promise<boolean> => {
	const entityValues = form.getValues(arrayName);
	const entity = entityValues[index];

	if (entity) {
		try {
			const response = await http.get(apiEndpoint, {
				params: {
					// You might need to customize this based on your entity structure
					first_name: entity.first_name,
					last_name: entity.last_name,
				},
			});

			console.log(response);

			// Use handleCheck function to handle the check
			await handleCheck(() => response.data.exists);

			return response.data.exists;
		} catch (error) {
			console.error(`Error checking ${arrayName} existence:`, error);
			return false;
		}
	}

	return false;
};
