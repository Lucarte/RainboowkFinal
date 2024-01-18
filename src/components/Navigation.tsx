import { NavLink } from "react-router-dom";
import SpreadMenu from "./SpreadMenu";

type Props = {
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navigation = ({ isActive, setIsActive }: Props) => {
	const handleNavLinkClick = () => {
		// Set isActive to false when a NavLink is clicked
		setIsActive(false);
	};
	return (
		<>
			<nav className={isActive ? "active" : "flex"}>
				<ul className='items-center hidden gap-16 pr-16 md:flex'>
					<li>
						<NavLink to='/'>Home</NavLink>
					</li>
					<li>
						<NavLink to='/catalog'>Catalog</NavLink>
					</li>
					<li>
						<NavLink to='/registration'>Register</NavLink>
					</li>

					<li>
						<NavLink to='/auth/book/form' onClick={handleNavLinkClick}>
							<button className='px-4 py-2 mx-12 text-sm text-white bg-indigo-500 rounded-md w-fit hover:text-indigo-400'>
								ADD BOOK
								{/* <NavLink to='/book/create'>English</NavLink> */}
								{/* <NavLink to='/libro/create'>Spanish</NavLink>
							<NavLink to='/livre/create'>French</NavLink>
						<NavLink to='/buch/create'>German</NavLink> */}
							</button>
						</NavLink>
					</li>
				</ul>
				<button
					onClick={() => setIsActive((value) => !value)}
					className='flex flex-col items-end justify-center gap-2 bg-cyan-400'>
					{/* Hamburger icon lines */}
					{/* <footer className='fixed bottom-0 flex flex-col justify-center w-full h-20 gap-3 px-8 bg-violet-900'> */}

					{/* <div className='border-red-600 bg-red-600 h-[.3rem] rounded-sm border-t-2 w-8'></div>
					<div className='border-orange-500 bg-orange-500 border-t-2 h-[.3rem] rounded-sm w-5'></div>
					<div className='border-yellow-500 bg-yellow-500 border-t-2 h-[.3rem] rounded-sm w-12'></div> */}
					<div className='border-white bg-white h-[.3rem] rounded-sm border-t-2 w-8'></div>
					<div className='border-white bg-white border-t-2 h-[.3rem] rounded-sm w-5'></div>
					<div className='border-white bg-white border-t-2 h-[.3rem] rounded-sm w-12'></div>
				</button>
			</nav>
			{isActive && <SpreadMenu setIsActive={setIsActive} />}
		</>
	);
};

export default Navigation;
