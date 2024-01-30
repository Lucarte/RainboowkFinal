export type SingleBookInfo = {
	id: number;
	user_id: number;
	ISBN: string;
	title: string;
	description: string;
	author_id: number;
	illustrator_id: number;
	print_date: string;
	publisher_id: number;
	original_language: string;
	created_at: string;
	updated_at: string;
	image_path: FileList;
	// image_path: Cover;

	authors: AuthorInfo[];
	illustrators: IllustratorInfo[];
	publisher: PublisherInfo;
};

export type Cover = {
	id: number;
	user_id: number;
	book_id: number | null;
	libro_id: number | null;
	livre_id: number | null;
	buch_id: number | null;
	image_path: string;
	created_at: string;
	updated_at: string;
};

export type AuthorInfo = {
	id: number;
	first_name: string;
	last_name: string;
	fullname: string;
	date_of_birth: string | null;
	date_of_death: string | null;
	biography: string | null;
	nationality: string | null;
	contact_email: string | null;
	website: string | null;
	awards_and_honors: string | null;
	created_at: string;
	updated_at: string;
	pivot: {
		book_id: number;
		author_id: number;
	};
};

export type IllustratorInfo = {
	id: number;
	first_name: string;
	last_name: string;
	fullname: string;
	date_of_birth: string | null;
	date_of_death: string | null;
	biography: string | null;
	nationality: string | null;
	contact_email: string | null;
	website: string | null;
	awards_and_honors: string | null;
	created_at: string;
	updated_at: string;
	pivot: {
		book_id: number;
		illustrator_id: number;
	};
};

export type PublisherInfo = {
	id: number;
	user_id: number;
	name: string;
	description: string | null;
	website: string | null;
	foundation_year: string | null;
	created_at: string;
	updated_at: string;
	[key: string]: any;
};
