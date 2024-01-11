import BookCover from "./BookCover";
import { SingleBookInfo } from "../types/SingleBookInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/http";

const Book = () => {
	const { title } = useParams();
	const [book, setBook] = useState<SingleBookInfo | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await http.get(`/api/book/${title}`);

				setBook(response.data.book);
				console.log(response);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [title]);

	return (
		<>
			<figure className='flex flex-col'>
				{book && (
					<div>
						<div className='flex flex-col gap-3 mt-10'>
							<div className='flex gap-2'>
								<h2 className='font-bold'>Title: </h2>
								<h1>{book.title}</h1>
							</div>
							<div className='flex flex-col gap-2'>
								<h2 className='font-bold'>Description: </h2>
								<p>{book.description}</p>
							</div>
							<div className='flex flex-col gap-2'>
								<h2 className='font-bold'>Cover: </h2>
								<p>{book.cover}</p>
							</div>
							<BookCover cover={book.cover} alt={book.title} />
						</div>
						<ul>
							{/* <BookExtraInfo
								author={book.author}
								illustrator={book.illustrator}
								publisher={{
									name: book.oName,
									website: book.website,
									year: book.year,
								}}
								original_language={book.original_language}
								print_date={book.print_date}
								ISBN={book.ISBN}
							/> */}
							{/* <li>{book.author}</li>
							<li>{book.illustrator}</li>
							<li>{book.publisher}</li> */}
						</ul>
					</div>
				)}
			</figure>
		</>
		// <section className='flex flex-col gap-6'>
		// </section>
	);
};

export default Book;
