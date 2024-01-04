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
		<div className='font-bold font-comfortaa pb-28 flex flex-col fixed inset-0 list-none items-end p-10 justify-evenly bg-cyan-500 text-white bg-opacity-80 z-10'>
			{/* <div className='bg-white p-4 rounded-md'> */}
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
