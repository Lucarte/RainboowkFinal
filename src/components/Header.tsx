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
			<header className='flex justify-between w-full px-6 py-8 text-indigo-900 border-4 border-indigo-900 lg:px-8 bg-cyan-400'>
				<div className='flex gap-1 text-4xl font-bold font-rubik'>
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
			<main className='flex justify-center w-screen pt-16 border-4 border-t-0 border-b-0 border-indigo-900 md:h-auto text-slate-600 font-elmessiri'>
				{isActive ? <SpreadMenu setIsActive={setIsActive} /> : null}
				<Outlet />
			</main>
		</>
	);
};
export default Header;
