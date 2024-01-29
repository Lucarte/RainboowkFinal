export interface HandleEntityExistenceProps {
	entityName: string;
	apiEndpoint: string;
	handleExistence: (
		firstName: string,
		lastName: string
	) => Promise<number | null>;
	openForm: () => void;
	closeForm: () => void;
}
