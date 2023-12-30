import { useEffect, useState } from "react";
import axios from "axios";

type Author = {
	id: number;
	name: string;
};

const Authors = () => {
	const [authors, setAuthors] = useState<Author[]>([]);

	useEffect(() => {
		// Define a function to fetch data
		const fetchData = async () => {
			try {
				// Make a GET request to your backend API endpoint
				const response = await axios.get("/api/authors"); // Adjust the endpoint

				// Update the state with the fetched data
				setAuthors(response.data.authors); // Adjust the structure based on your API response
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		// Call the fetch function
		fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<div>
			<h1>Authors</h1>
			{/* Render your authors data */}
			<ul>
				{authors.map((author) => (
					<li key={author.id}>{author.name}</li>
				))}
			</ul>
		</div>
	);
};

export default Authors;
