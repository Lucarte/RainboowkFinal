import React from "react";
import { NavLink } from "react-router-dom";

const RootError = () => {
	return (
		<>
			<div className='flex flex-col items-center w-screen h-screen gap-10 bg-indigo-600 pt-80'>
				<h1 className='text-3xl font-black text-white font-kids'>ooops!!!</h1>
				<h2 className='text-xl'>Please turn the page back</h2>
				<div className='text-6xl font-black text-white font-kids2'>
					<NavLink to='/'>HOME</NavLink>
				</div>
			</div>
		</>
	);
};

export default RootError;
