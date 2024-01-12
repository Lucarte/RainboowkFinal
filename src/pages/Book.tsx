import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleBookInfo } from "../types/SingleBookInfo";
import http from "../utils/http";

const Book = () => {
	const { title } = useParams();
	const [book, setBook] = useState<SingleBookInfo | null>(null);
	const [coverPath, setCoverPath] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await http.get(`/api/book/${title}`);
				setBook(response.data.book);

				// Access the cover information
				const cover = response.data.book.cover;

				// Set the cover path in the state
				setCoverPath(cover.image_path);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [title]);

	return (
		<>
			<figure className='flex flex-col pb-36'>
				{book && (
					<div>
						<div className='flex flex-col gap-3 mt-10'>
							<div className='flex gap-2'>
								<h2 className='font-bold'>Title: </h2>
								<h1>{book.title}</h1>
							</div>
							{coverPath ? (
								<img
									className='w-56'
									src={`http://localhost/api/cover/${book.cover.id}`}
									alt='Cover'
								/>
							) : (
								<p>Cover not found --from Book.tsx</p>
							)}
							<div className='flex flex-col gap-2'>
								<h2 className='font-bold'>Description: </h2>
								<p>{book.description}</p>
							</div>
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
	);
};

export default Book;
