import React from "react";
import { NavLink } from "react-router-dom";

const RootError = () => {
	return (
		<>
			<div className='flex flex-col w-screen h-screen gap-10 bg-indigo-600'>
				<h1 className='font-black text-white'>OOOPS!!!</h1>
				<h2 className='text-xl'>You might want to turn back</h2>
				<div className='p-8 text-indigo-600 bg-white'>
					<NavLink to='/'>HOME</NavLink>
				</div>
			</div>
		</>
	);
};

export default RootError;
