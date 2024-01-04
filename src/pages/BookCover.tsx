import React from "react";

type Props = {
	cover: string;
	alt: string;
};

const BookCover = ({ cover, alt }: Props) => {
	return (
		<figure className='w-80'>
			<img src={cover} alt={alt} />
		</figure>
	);
};

export default BookCover;
