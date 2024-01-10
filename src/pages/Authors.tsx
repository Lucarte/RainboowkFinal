// DOES NOT WORK AS OF 31.12.2023.
// MAKE A LINK HERE TO TAKE USERS TO THE SINGLE AUTHORS
// BZW. MAKE THE AUTHORS CLICKABLE TO GO

import { useEffect, useState } from "react";
import http from "../utils/http";

type Author = {
	id: number;
	fullname: string;
};

const Authors = () => {
	const [authors, setAuthors] = useState<Author[]>([]);

	useEffect(() => {
		// Define a function to fetch data
		const fetchData = async () => {
			try {
				// Make a GET request to your backend API endpoint
				const response = await http.get("/api/authors");

				// Log the entire response
				console.log("Full Response:", response);

				// Update the state with the fetched data
				const fetchedAuthors = response.data.Authors || [];
				console.log("Fetched Authors:", fetchedAuthors);
				setAuthors(fetchedAuthors);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<div>
			<h1>Authors</h1>
			{/* Render your authors data */}
			<ul>
				{authors.map((author) => (
					<li key={author.id}>
						<button>{author.fullname}</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Authors;
