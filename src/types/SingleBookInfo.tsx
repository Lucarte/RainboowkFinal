export type SingleBookInfo = {
	cover: Cover;
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
	alt: string;
	author: string;
	illustrator: string;
	publisher: string;
	oName: string;
	website?: string;
	year?: number;
};

export type Cover = {
	id: number;
	user_id: number;
	book_id: number;
	libro_id: number | null;
	livre_id: number | null;
};
