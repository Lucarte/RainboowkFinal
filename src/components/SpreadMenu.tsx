import { NavLink } from "react-router-dom";

type Props = {
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpreadMenu = ({ setIsActive }: Props) => {
	const handleNavLinkClick = () => {
		// Set isActive to false when a NavLink is clicked
		setIsActive(false);
	};
	return (
		<div className='fixed inset-0 z-10 flex flex-col items-end p-10 font-bold text-white list-none font-comfortaa pb-28 justify-evenly bg-cyan-500 bg-opacity-80'>
			{/* <div className='p-4 bg-white rounded-md'> */}
			<li>
				<button className='px-4 py-2 mx-12 text-sm text-white bg-indigo-500 rounded-md w-fit hover:text-indigo-400'>
					Add Book
					<NavLink to='/book/create'></NavLink>
					{/* <NavLink to='/book/create'>English</NavLink> */}
					{/* <NavLink to='/libro/create'>Spanish</NavLink>
							<NavLink to='/livre/create'>French</NavLink>
							<NavLink to='/buch/create'>German</NavLink> */}
				</button>
			</li>
			<li>
				<NavLink to='/' onClick={handleNavLinkClick}>
					homE
				</NavLink>
			</li>
			<li>
				<NavLink to='/catalog' onClick={handleNavLinkClick}>
					fulL cataloG
				</NavLink>
			</li>
			<li>
				<NavLink to='/books' onClick={handleNavLinkClick}>
					books in englisH
				</NavLink>
			</li>
			<li className=''>
				<NavLink to='/libros' onClick={handleNavLinkClick}>
					books in spanisH
				</NavLink>
			</li>
			<li>
				<NavLink to='/livres' onClick={handleNavLinkClick}>
					books in frencH
				</NavLink>
			</li>
			<li>
				<NavLink to='/buecher' onClick={handleNavLinkClick}>
					books in germaN
				</NavLink>
			</li>
			<li>
				<NavLink to='/authors' onClick={handleNavLinkClick}>
					authorS
				</NavLink>
			</li>
			<li>
				<NavLink to='/illustrators' onClick={handleNavLinkClick}>
					illustratorS
				</NavLink>
			</li>
			<li>
				<NavLink to='/publishers' onClick={handleNavLinkClick}>
					publisherS
				</NavLink>
			</li>
			<li>
				<NavLink to='/registration' onClick={handleNavLinkClick}>
					registratioN
				</NavLink>
			</li>
			<li>
				<NavLink to='/login' onClick={handleNavLinkClick}>
					logiN
				</NavLink>
			</li>
			{/* </div> */}
		</div>
	);
};

export default SpreadMenu;
