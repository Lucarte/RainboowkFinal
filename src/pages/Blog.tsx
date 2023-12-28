// import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

type Blogpost = {
	id: number;
	title: string;
	description: string;
	slug: string;
};

const Blog = () => {
	// const [blogposts, setBlogposts] = useState<Blogpost[]>();
	const blogposts = useLoaderData() as Blogpost[];

	// useEffect(() => {
	// 	fetch("http://localhost:3000/blogposts")
	// 		.then((res) => {
	// 			return res.json();
	// 		})
	// 		.then((data) => {
	// 			setBlogposts(data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }, []);
	return (
		<>
			{blogposts
				? blogposts.map((post) => {
						return (
							<div>
								<Link to={post.slug} key={post.id}>
									{post.title}
								</Link>
								<br />
							</div>
						);
				  })
				: null}
		</>
	);
};

export default Blog;

export const blogloader = async () => {
	const res = await fetch("http://localhost:5173/blogposts");

	if (!res.ok) {
		throw Error("Could not fetch Blogposts");
	}

	return res.json();
};
