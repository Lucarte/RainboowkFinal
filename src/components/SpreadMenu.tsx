import { NavLink } from "react-router-dom";

type Props = {
	onClose: () => void;
};

const SpreadMenu = ({ onClose }: Props) => {
	const handleNavLinkClick = () => {
		// Call onClose to close the menu
		onClose();
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
