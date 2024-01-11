import { useEffect, useState } from "react";
import http from "../utils/http";
import { BooksInfo } from "../types/BooksInfo";

const Books = () => {
	const [books, setBooks] = useState<BooksInfo[]>([]);

	useEffect(() => {
		// Define a function to fetch data
		const fetchData = async () => {
			try {
				// Make a GET request to your backend API endpoint
				const response = await http.get("/api/books");

				// Log the entire response
				console.log("Full Response:", response);

				setBooks(response.data.Books);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<div className='flex flex-col gap-12'>
			<h1>Books</h1>
			{books.map((book) => (
				<button key={book.title}>
					<ul>
						<li>Title: {book.title}</li>
						<li>ISBN: {book.ISBN}</li>
						<li>Description: {book.description}</li>
						<li>Cover: {book.image_path}</li>
						<li>Original Language: {book.original_language}</li>
						<li>Date of Print: {book.print_date}</li>
					</ul>
				</button>
			))}
		</div>
	);
};

export default Books;
