// DOES NOT WORK AS OF 31.12.2023.
// MAKE A LINK HERE TO TAKE USERS TO THE SINGLE Publishers
// BZW. MAKE THE Publishers CLICKABLE TO GO

import { useEffect, useState } from "react";
import http from "../utils/http";

type Publisher = {
	id: number;
	name: string;
};

const Publishers = () => {
	const [publishers, setPublishers] = useState<Publisher[]>([]);

	useEffect(() => {
		console.log("Component mounted!");
		// Define a function to fetch data
		const fetchData = async () => {
			try {
				// Make a GET request to your backend API endpoint
				const response = await http.get("/api/publishers"); // Adjust the endpoint

				// Log the entire response
				console.log("Full Response:", response);

				// Update the state with the fetched data
				const fetchedPublishers = response.data.Publishers || [];
				console.log("Fetched Publishers:", fetchedPublishers);
				setPublishers(fetchedPublishers);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		// Call the fetch function
		fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<div>
			<h1>Publishers</h1>
			{/* Render your publishers data */}
			<ul>
				{publishers.map((publisher) => (
					<li key={publisher.id}>{publisher.name}</li>
				))}
			</ul>
		</div>
	);
};

export default Publishers;
