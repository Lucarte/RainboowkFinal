import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import SpreadMenu from "./SpreadMenu";

type Props = {
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	handleLogout: () => void;
	closeMenu: () => void;
};

const Navigation = ({
	isActive,
	setIsActive,
	handleLogout,
	closeMenu,
}: Props) => {
	const { auth } = useContext(AuthContext);

	return (
		<>
			<nav className={isActive ? "active" : "flex gap-3"}>
				<ul className='hidden md:flex gap-3'>
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
				</ul>
				<button
					onClick={() => setIsActive((value) => !value)}
					className='bg-slate-600'>
					{/* Hamburger icon lines */}
					<div className='border-white bg-white h-[.3rem] rounded-sm border-t-2 w-8'></div>
					<div className='border-white bg-white border-t-2 h-[.3rem] rounded-sm w-5'></div>
					<div className='border-white bg-white border-t-2 h-[.3rem] rounded-sm w-12'></div>
				</button>
			</nav>
			{isActive && <SpreadMenu onClose={closeMenu} />}
		</>
	);
};

export default Navigation;
