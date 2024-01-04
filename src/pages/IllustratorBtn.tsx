import React from "react";

type Props = {
	illustrator: string;
};

const IllustratorBtn = ({ illustrator }: Props) => {
	return (
		<div>
			<div className='flex gap-3'>
				<p className='font-bold text-md'>Illustrator:</p>
				<button className='py-1 bg-cyan-100'>
					<p className='text-md'>{illustrator}</p>
				</button>
			</div>
		</div>
	);
};

export default IllustratorBtn;
