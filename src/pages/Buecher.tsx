import { useEffect, useState } from "react";
import http from "../utils/http";
import { BooksInfo } from "../types/BooksInfo";

const Buecher = () => {
	const [buecher, setBuecher] = useState<BooksInfo[]>([]);

	useEffect(() => {
		// Define a function to fetch data
		const fetchData = async () => {
			try {
				// Make a GET request to your backend API endpoint
				const response = await http.get("/api/buecher");

				// Log the entire response
				console.log("Full Response:", response);

				setBuecher(response.data.Buecher);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<div className='flex flex-col gap-12'>
			<h1>Buecher</h1>
			{buecher.map((buch) => (
				<button key={buch.title}>
					<ul>
						<li>Title: {buch.title}</li>
						<li>ISBN: {buch.ISBN}</li>
						<li>ISBN: {buch.description}</li>
						<li>ISBN: {buch.image_path}</li>
						<li>ISBN: {buch.original_language}</li>
						<li>ISBN: {buch.print_date}</li>
					</ul>
				</button>
			))}
		</div>
	);
};

export default Buecher;
