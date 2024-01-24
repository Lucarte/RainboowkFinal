// Options for my Salutation Select Field
export const greetOptions = [
	"Dear Individual",
	"Dear Person",
	"Dear Child",
	"Mrs.",
	"Mr.",
] as const;

// Options for my Locality (radio input) Field
export const localityOptions = [
	{ value: "Within Germany", label: "within germanY" },
	{ value: "Beyond Germany", label: "beyond germanY" },
] as const;

// Options for my PersonRole Select Field
export const roleOptions = [
	"Author",
	"Child",
	"Librarian",
	"Opposed to the Biodiversity",
	"Publisher Representative",
	"Activist",
	"Binary World Defender",
	"Journalist",
	"Curious Person",
] as const;

// Options for my Publicity Select Field
export const publicityOptions = [
	"Mouthword",
	"Online Search",
	"Other",
] as const;
