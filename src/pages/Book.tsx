import BookTitleAndDescription from "./BookTitleAndDescription";
// import BookCover from "./BookCover";
// import BookExtraInfo from "./BookExtraInfo";
// import { AddBookInfo } from "../types/AddBookTypes";
import { ApiBookInfo } from "../types/ApiBookTypes";

type Props = {
	book: ApiBookInfo;
	// addBooks: AddBookInfo;
};

const Book = ({ book }: Props) => {
	return (
		<section className='flex flex-col gap-6'>
			<BookTitleAndDescription
				title={book.title}
				description={book.description}
			/>
			{/* <BookCover cover={addBooks.cover} alt={addBooks.title} />
			<BookExtraInfo
				author={addBooks.author}
				illustrator={addBooks.illustrator}
				publisher={{
					oName: addBooks.publisher.oName,
					website: addBooks.publisher.website,
					year: addBooks.publisher.year,
				}}
				oLan={addBooks.oLan}
				date={addBooks.date}
				isbn={addBooks.isbn}
			/> */}
		</section>
	);
};

export default Book;
