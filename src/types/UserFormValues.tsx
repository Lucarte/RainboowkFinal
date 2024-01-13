export type FormValues = {
	pronouns?: string;
	salutation: "Dear Individual" | "Dear Person" | "Dear child" | "Mrs." | "Mr";
	username: string;
	email: string;
	dob: string;
	locality: "Within Germany" | "Outside Germany";
	personRole:
		| "Author"
		| "Child"
		| "Librarian"
		| "Opposed to the Biodiversity"
		| "Publisher Representative"
		| "Activist"
		| "Binary World Defender"
		| "Journalist"
		| "Curious Person";
	publicity: "Mouthword" | "Online Search" | "Other";
	password: string;
	passwordConfirmation: string;
	terms: boolean;
};
