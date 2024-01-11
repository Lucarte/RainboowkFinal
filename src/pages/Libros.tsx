import { useEffect, useState } from "react";
import http from "../utils/http";
import { BooksInfo } from "../types/BooksInfo";

const Libros = () => {
	const [libros, setLibros] = useState<BooksInfo[]>([]);

	useEffect(() => {
		// Define a function to fetch data
		const fetchData = async () => {
			try {
				// Make a GET request to your backend API endpoint
				const response = await http.get("/api/libros");

				// Log the entire response
				console.log("Full Response:", response);

				setLibros(response.data.Libros);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<div className='flex flex-col gap-12'>
			<h1>libros</h1>
			{libros.map((libro) => (
				<button key={libro.title}>
					<ul>
						<li>Title: {libro.title}</li>
						<li>ISBN: {libro.ISBN}</li>
						<li>ISBN: {libro.description}</li>
						<li>ISBN: {libro.image_path}</li>
						<li>ISBN: {libro.original_language}</li>
						<li>ISBN: {libro.print_date}</li>
					</ul>
				</button>
			))}
		</div>
	);
};

export default Libros;
