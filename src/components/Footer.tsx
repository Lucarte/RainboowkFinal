import React from "react";

const Footer = () => {
	return (
		<>
			<footer className='fixed bottom-0 flex flex-col justify-center w-full h-20 gap-3 px-8 bg-violet-200'>
				<div className='bg-sky-700 h-[.3rem] rounded-sm w-8'></div>
				<div className='bg-green-600 h-[.3rem] rounded-sm w-5'></div>
				<div className='bg-violet-700 h-[.3rem] rounded-sm w-12'></div>
			</footer>
		</>
	);
};

export default Footer;
