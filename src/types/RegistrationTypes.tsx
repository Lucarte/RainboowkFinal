export type RegistrationInfo = {
	pronouns?: string;
	salutation: "Dear individual" | "Dear person" | "Dear child" | "Mrs." | "Mr";
	username: string;
	email: string;
	dob: string;
	locality: "within Germany" | "outside Germany";
	personRole:
		| "author"
		| "child"
		| "librarian"
		| "opposed_to_the_biodiversity"
		| "publisher_representative"
		| "activist"
		| "binary_world_defender"
		| "journalist"
		| "curious_person";
	publicity: "mouthword" | "online_search" | "other";
	password: string;
	terms: boolean;
};
