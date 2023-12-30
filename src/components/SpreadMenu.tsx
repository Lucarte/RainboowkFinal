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
		<div className='fixed inset-0 flex items-center justify-center bg-orange-500 bg-opacity-80'>
			<div className='bg-white p-4 rounded-md'>
				<li>
					<NavLink to='/' onClick={handleNavLinkClick}>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to='/catalog' onClick={handleNavLinkClick}>
						FULL CATALOG
					</NavLink>
				</li>
				<li>
					<NavLink to='/books' onClick={handleNavLinkClick}>
						BOOKS IN ENGLISH
					</NavLink>
				</li>
				<li>
					<NavLink to='/libros' onClick={handleNavLinkClick}>
						BOOKS IN SPANISH
					</NavLink>
				</li>
				<li>
					<NavLink to='/livres' onClick={handleNavLinkClick}>
						BOOKS IN FRENCH
					</NavLink>
				</li>
				<li>
					<NavLink to='/buecher' onClick={handleNavLinkClick}>
						BOOKS IN GERMAN
					</NavLink>
				</li>
				<li>
					<NavLink to='/authors' onClick={handleNavLinkClick}>
						AUTHORS
					</NavLink>
				</li>
				<li>
					<NavLink to='/illustrators' onClick={handleNavLinkClick}>
						ILLUSTRATORS
					</NavLink>
				</li>
				<li>
					<NavLink to='/publishers' onClick={handleNavLinkClick}>
						PUBLISHERS
					</NavLink>
				</li>
				<li>
					<NavLink to='/registration' onClick={handleNavLinkClick}>
						Registration
					</NavLink>
				</li>
				<li>
					<NavLink to='/login' onClick={handleNavLinkClick}>
						Login
					</NavLink>
				</li>
			</div>
		</div>
	);
};

export default SpreadMenu;
