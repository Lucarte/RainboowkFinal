// handleEntityExistence.tsx
import http from "./http";
import { HandleEntityExistenceProps } from "../types/EntityExistence";

const handleEntityExistence = async ({
	entityName,
	apiEndpoint,
	handleExistence,
	openForm,
	closeForm,
	firstName, // Add firstName and lastName parameters
	lastName,
}: HandleEntityExistenceProps & { firstName: string; lastName: string }) => {
	try {
		const response = await http.get(apiEndpoint, {
			params: {
				entityName,
				first_name: firstName, // Pass firstName and lastName as parameters
				last_name: lastName,
			},
		});
		const { entityId } = response.data || {
			entityId: null,
		};

		console.log(
			`${entityName} Existence Check Result:`,
			`${entityName} ID:`,
			entityId
		);

		handleExistence(firstName, lastName);

		if (entityId) {
			closeForm();
		} else {
			openForm();
		}
	} catch (error) {
		console.error(`Error during ${entityName} existence check:`, error);
	}
};

export default handleEntityExistence;
