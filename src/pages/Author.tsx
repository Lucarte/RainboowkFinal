import { useEffect, useState } from "react";
import http from "../utils/http";
import { useParams } from "react-router-dom";

type AuthorInfo = {
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

const Author = () => {
	const { slug } = useParams();
	const [author, setAuthor] = useState<AuthorInfo | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await http.get(`/api/author/${slug}`);

				setAuthor(response.data.author);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [slug]);

	return (
		<>
			<figure className='flex flex-col'>
				{author && (
					<div>
						<h1 className='text-2xl font-bold text-center'>
							{author.first_name}
						</h1>
						<ul>
							<li>{author.last_name}</li>
							{/* toLocaleDateString method to convert Date objects to strings in a locale-specific format */}
							<li>{author.date_of_birth}</li>
							<li>{author.date_of_death}</li>
							<li>{author.biography}</li>
							<li>{author.contact_email}</li>
							<li>{author.nationality}</li>
							<li>{author.website}</li>
						</ul>
					</div>
				)}
			</figure>
		</>
	);
};

export default Author;

// From my AuthorController
// Validate author data
// $rules = [
//     'first_name' => 'required|max:255|alpha',
//     'last_name' => 'required|max:255|alpha',
//     'date_of_birth' => 'date|nullable',
//     'date_of_death' => 'date|nullable',
//     'biography' => 'nullable',
//     'nationality' => 'max:255|nullable',
//     'contact_email' => 'email|max:255|nullable|unique:authors',
//     'website' => 'max:255|nullable',
//     'awards_and_honors' => 'nullable'
// ];
