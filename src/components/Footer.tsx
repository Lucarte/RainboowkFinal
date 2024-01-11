import { AuthContext } from "../context/AuthProvider";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

type Props = {
	handleLogout: () => void;
};

const Footer = ({ handleLogout }: Props) => {
	const { auth } = useContext(AuthContext);
	return (
		<>
			<footer className='fixed bottom-0 flex w-full h-20 bg-indigo-900'>
				<ul className='flex justify-between w-full px-6'>
					<li className='flex flex-col justify-center gap-3'>
						<div className='bg-sky-700 h-[.3rem] rounded-sm w-8'></div>
						<div className='bg-green-600 h-[.3rem] rounded-sm w-5'></div>
						<div className='bg-violet-500 h-[.3rem] rounded-sm w-12'></div>
					</li>
					{auth.id ? (
						<li className='flex items-center'>
							<div className='flex gap-8'>
								<p className='text-indigo-300'>
									Welcome back, {auth.username}!
								</p>
								<button
									className='px-3 py-1 text-sm font-bold text-indigo-900 bg-white rounded-md'
									onClick={handleLogout}>
									Logout
								</button>
							</div>
						</li>
					) : (
						// 'Invisitble' for now
						<li className='flex items-center'>
							<button className='h-8 px-3 text-sm font-bold bg-indigo-200 rounded-md'>
								<NavLink to='/login'>LOGIN</NavLink>
							</button>
						</li>
					)}
				</ul>
			</footer>
		</>
	);
};

export default Footer;
