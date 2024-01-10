import { useEffect, useState } from "react";
import http from "../utils/http";
import { useParams } from "react-router-dom";

type publisherInfo = {
	name: string;
	description?: string;
	website?: string;
	foundation_year?: number;
};

const Publisher = () => {
	const { name } = useParams();
	const [publisher, setPublisher] = useState<publisherInfo | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await http.get(`/api/publisher/${name}`);

				setPublisher(response.data.Publisher);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [name]);

	return (
		<>
			<figure className='flex flex-col'>
				{publisher && (
					<div>
						<h1 className='text-2xl font-bold text-center'>{publisher.name}</h1>
						<ul>
							<li>{publisher.name}</li>
							{/* toLocaleDateString method to convert Date objects to strings in a locale-specific format */}
							<li>{publisher.description}</li>
							<li>{publisher.website}</li>
							<li>{publisher.foundation_year}</li>
						</ul>
					</div>
				)}
			</figure>
		</>
	);
};

export default Publisher;

// From DB
// $publisher->user_id = $user->id; // Set the 'user_id' based on the user found by username
//                 $publisher->name = $request->input('name');
//                 $publisher->description = $request->input('description');
//                 $publisher->website = $request->input('website');
//                 $publisher->foundation_year = $request->input('foundation_year');
