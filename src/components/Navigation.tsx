import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import SpreadMenu from "./SpreadMenu";

type Props = {
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	handleLogout: () => void;
};

const Navigation = ({ isActive, setIsActive, handleLogout }: Props) => {
	const { auth } = useContext(AuthContext);

	return (
		<>
			<nav className={isActive ? "active" : "flex"}>
				<ul className='hidden md:flex gap-3 pr-16 items-center'>
					<li>
						<NavLink to='/'>Home</NavLink>
					</li>
					<li>
						<NavLink to='/registration'>Registration</NavLink>
					</li>
					{auth.id ? (
						<li>
							<div>
								<p>You are logged in as: {auth.username}</p>
								<button className='text-orange-500' onClick={handleLogout}>
									Logout
								</button>
							</div>
						</li>
					) : (
						<li>
							<NavLink to='/login'>Login</NavLink>
						</li>
					)}
					<li>
						<button className='text-sm bg-indigo-500 mx-12 py-2 px-4 rounded-md w-fit hover:text-indigo-400 text-white'>
							<NavLink to='/login'>Add Book</NavLink>
						</button>
					</li>
				</ul>
				<button
					onClick={() => setIsActive((value) => !value)}
					className='bg-cyan-400 flex flex-col gap-2 justify-center items-end'>
					{/* Hamburger icon lines */}
					{/* <footer className='fixed bottom-0 flex flex-col justify-center w-full h-20 gap-3 px-8 bg-violet-900'> */}

					<div className='border-red-600 bg-red-600 h-[.3rem] rounded-sm border-t-2 w-8'></div>
					<div className='border-orange-500 bg-orange-500 border-t-2 h-[.3rem] rounded-sm w-5'></div>
					<div className='border-yellow-500 bg-yellow-500 border-t-2 h-[.3rem] rounded-sm w-12'></div>
				</button>
			</nav>
			{isActive && <SpreadMenu setIsActive={setIsActive} />}
		</>
	);
};

export default Navigation;
