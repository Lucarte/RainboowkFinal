import { useForm } from "react-hook-form";
import http from "./http";

export const handleEntityExistence = async (
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
	closeForm: () => void
): Promise<boolean> => {
	const entityValues = form.getValues(arrayName);
	const entity = entityValues[entityIndex];

	if (entity) {
		try {
			const response = await http.get(apiEndpoint, {
				params: {
					// You might need to customize this based on your entity structure
					first_name: entity.first_name,
					last_name: entity.last_name,
					name: entity.name,
				},
			});

			console.log(response);

			// Use handleCheck function to handle the check
			await handleCheck(() => response.data.exists);

			// Update the visibility of the form based on the result
			if (response.data.exists) {
				closeForm();
			} else {
				openForm();
			}

			return response.data.exists;
		} catch (error) {
			console.error(`Error checking ${arrayName} existence:`, error);
			return false;
		}
	}

	console.log(`Error: ${entityName} information missing.`);
	return false;
};
