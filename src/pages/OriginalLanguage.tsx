import React from "react";
// import { Book } from '../types/BookTypes'

type Props = {
	oLan: string;
};

// type Props = {
//     books: Book
// }

// const OriginalLanguage = ({books}:Props) => {
const OriginalLanguage = ({ oLan }: Props) => {
	return (
		<div className='flex gap-3'>
			<h2 className='font-bold'>Original Language: </h2>
			<p>{oLan}</p>
		</div>
	);
};

export default OriginalLanguage;
