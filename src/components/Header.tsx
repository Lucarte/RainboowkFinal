import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import SpreadMenu from "./SpreadMenu";

type Props = {
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	handleLogout: () => void;
};

const Header = ({ isActive, setIsActive, handleLogout }: Props) => {
	return (
		<>
			<header className='flex justify-between w-full px-6 py-8 lg:px-8 bg-cyan-400 border-4 border-indigo-900 text-indigo-900'>
				<div className='flex gap-1 font-rubik text-4xl font-bold'>
					<h1 className='pt-1'>RAIN</h1>
					<h1 className='font-kids2'>BOO</h1>
					<h1 className='pt-1'>W</h1>
					<h1 className='font-kids2'>K</h1>
				</div>

				<Navigation
					handleLogout={handleLogout}
					isActive={isActive}
					setIsActive={setIsActive}
				/>
			</header>
			<main>
				{isActive ? <SpreadMenu setIsActive={setIsActive} /> : null}
				<Outlet />
			</main>
		</>
	);
};
export default Header;
