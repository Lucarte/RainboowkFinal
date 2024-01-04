import React from "react";

type Props = {
	isbn: string;
};

const ISBNNumber = ({ isbn }: Props) => {
	return <div>{isbn}</div>;
};

export default ISBNNumber;
