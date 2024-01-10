import { useEffect, useState } from "react";
import http from "../utils/http";
import { useParams } from "react-router-dom";

type IllustratorInfo = {
	first_name: string;
	last_name: string;
	date_of_birth?: string;
	date_of_death?: string;
	biography?: string;
	nationality?: string;
	contact_email: string;
	website?: string;
	awards_and_honors?: string;
	slug: string;
};

const Illustrator = () => {
	const { slug } = useParams();
	const [illustrator, setIllustrator] = useState<IllustratorInfo | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await http.get(`/api/illustrator/${slug}`);

				setIllustrator(response.data.Illustrator);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [slug]);

	return (
		<>
			<figure className='flex flex-col'>
				{illustrator && (
					<div>
						<h1 className='text-2xl font-bold text-center'>
							{illustrator.first_name}
						</h1>
						<ul>
							<li>{illustrator.last_name}</li>
							{/* toLocaleDateString method to convert Date objects to strings in a locale-specific format */}
							<li>{illustrator.date_of_birth}</li>
							<li>{illustrator.date_of_death}</li>
							<li>{illustrator.biography}</li>
							<li>{illustrator.contact_email}</li>
							<li>{illustrator.nationality}</li>
							<li>{illustrator.website}</li>
						</ul>
					</div>
				)}
			</figure>
		</>
	);
};

export default Illustrator;
