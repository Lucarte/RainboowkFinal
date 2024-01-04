export type AddBookInfo = {
	catalogLanguage: string;
	title: string;
	description: string;
	cover: string;
	alt: string;
	author: string;
	illustrator: string;
	publisher: {
		oName: string;
		website: string;
		year: number;
	};
	oLan: string;
	date: string;
	isbn: string;
	translatedInto: string;
};
