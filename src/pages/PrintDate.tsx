import React from "react";

type Props = {
	date: string;
};

const PrintDate = ({ date }: Props) => {
	return <div>{date}</div>;
};

export default PrintDate;
