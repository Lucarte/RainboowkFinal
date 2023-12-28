import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import SpreadMenu from "./SpreadMenu";

type Props = {
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	handleLogout: () => void;
	onClose: () => void;
};

const Header = ({ isActive, setIsActive, handleLogout, onClose }: Props) => {
	return (
		<>
			<header className='flex justify-between w-full px-6 py-8 lg:px-8 bg-cyan-400 text-violet-700'>
				<h1>RAINBOOWK</h1>
				<Navigation
					handleLogout={handleLogout}
					isActive={isActive}
					setIsActive={setIsActive}
					onClose={onClose}
				/>
			</header>
			<main>
				{isActive ? <SpreadMenu onClose={onClose} /> : null}
				<Outlet />
			</main>
		</>
	);
};
export default Header;
