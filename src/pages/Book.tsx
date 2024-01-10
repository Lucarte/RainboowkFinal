import BookTitleAndDescription from "./BookTitleAndDescription";
import BookCover from "./BookCover";
import BookExtraInfo from "./BookExtraInfo";
import { ApiBookInfo } from "../types/ApiBookTypes";

type Props = {
	book: ApiBookInfo;
};

const Book = ({ book }: Props) => {
	return (
		<section className='flex flex-col gap-6'>
			<BookTitleAndDescription
				title={book.title}
				description={book.description}
			/>
			<BookCover cover={book.cover} alt={book.title} />
			<BookExtraInfo
				author={book.author}
				illustrator={book.illustrator}
				publisher={{
					oName: book.oName,
					website: book.website,
					year: book.year,
				}}
				original_language={book.original_language}
				print_date={book.print_date}
				ISBN={book.ISBN}
			/>
		</section>
	);
};

export default Book;
