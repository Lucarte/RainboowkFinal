// MAKE A LINK HERE TO TAKE USERS TO THE SINGLE Illustrators
// BZW. MAKE THE Illustrators CLICKABLE TO GO

import { useEffect, useState } from "react";
import http from "../utils/http";

type Illustrator = {
	id: number;
	fullname: string;
};

const Illustrators = () => {
	const [illustrators, setIllustrators] = useState<Illustrator[]>([]);

	useEffect(() => {
		// Define a function to fetch data
		const fetchData = async () => {
			try {
				// Make a GET request to your backend API endpoint
				const response = await http.get("/api/illustrators"); // Adjust the endpoint

				// Log the entire response
				console.log("Full Response:", response);

				// Update the state with the fetched data
				const fetchedIllustrators = response.data.Illustrators || [];
				console.log("Fetched Illustrators:", fetchedIllustrators);
				setIllustrators(fetchedIllustrators);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		// Call the fetch function
		fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<div>
			<h1>Illustrators</h1>
			{/* Render your Illustrators data */}
			<ul>
				{illustrators.map((illustrator) => (
					<li key={illustrator.id}>{illustrator.fullname}</li>
				))}
			</ul>
		</div>
	);
};
export default Illustrators;
