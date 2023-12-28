import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

const Blogpost = () => {
	const blogpost: any = useLoaderData();

	return (
		<section>
			<h1>{blogpost?.title}</h1>
			<p>{blogpost?.description}</p>
		</section>
	);
};

export default Blogpost;

export const blopostLoader = async ({ params }: LoaderFunctionArgs) => {
	const { slug } = params;

	const res = await fetch(`http://localhost:3000/${slug}`);
	// const res = await fetch(`http://localhost:3000/blogposts/${slug}`);

	if (!res.ok) {
		throw Error("Could not fetch Blogposts");
	}

	return res.json();
};
