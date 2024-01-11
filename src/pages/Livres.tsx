import { useEffect, useState } from "react";
import http from "../utils/http";
import { BooksInfo } from "../types/BooksInfo";

const Livres = () => {
	const [livres, setLivres] = useState<BooksInfo[]>([]);

	useEffect(() => {
		// Define a function to fetch data
		const fetchData = async () => {
			try {
				// Make a GET request to your backend API endpoint
				const response = await http.get("/api/livres");

				// Log the entire response
				console.log("Full Response:", response);

				setLivres(response.data.Livres);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<div className='flex flex-col gap-12'>
			<h1>Livres</h1>
			{livres.map((livre) => (
				<button key={livre.title}>
					<ul>
						<li>Title: {livre.title}</li>
						<li>ISBN: {livre.ISBN}</li>
						<li>ISBN: {livre.description}</li>
						<li>ISBN: {livre.image_path}</li>
						<li>ISBN: {livre.original_language}</li>
						<li>ISBN: {livre.print_date}</li>
					</ul>
				</button>
			))}
		</div>
	);
};

export default Livres;
