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
		<ul className='fixed inset-0 z-10 flex flex-col items-end p-10 font-bold tracking-widest text-indigo-600 list-none md:text-2xl font-elmerissi pb-28 justify-evenly bg-cyan-500 bg-opacity-80'>
			{/* <div className='p-4 bg-white rounded-md'> */}
			<li className=''>
				<NavLink to='/auth/book/form' onClick={handleNavLinkClick}>
					<button className='pt-2 pb-1 pl-4 font-bold text-left bg-white rounded-r-full md:text-white w-80 hover:text-indigo-600'>
						ADD BOOK
						{/* <NavLink to='/book/create'>English</NavLink> */}
						{/* <NavLink to='/libro/create'>Spanish</NavLink>
							<NavLink to='/livre/create'>French</NavLink>
						<NavLink to='/buch/create'>German</NavLink> */}
					</button>
				</NavLink>
			</li>
			<NavLink to='/' onClick={handleNavLinkClick}>
				<li className='pt-1 pr-4 text-right text-white bg-indigo-600 rounded-l-full md:text-indigo-600 w-80 md:mr-20 hover:bg-white'>
					homE
				</li>
			</NavLink>
			<NavLink to='/catalog' onClick={handleNavLinkClick}>
				<li className='pt-1 pr-4 text-right text-white bg-indigo-600 rounded-l-full md:text-indigo-600 w-80 hover:bg-white md:mr-32'>
					full cataloG
				</li>
			</NavLink>
			<NavLink to='/books' onClick={handleNavLinkClick}>
				<li className='pt-1 pr-4 text-right text-white bg-indigo-600 rounded-l-full md:mr-44 w-80 md:text-indigo-600 hover:bg-white'>
					books in englisH
				</li>
			</NavLink>
			<NavLink to='/libros' onClick={handleNavLinkClick}>
				<li className='pt-1 pr-4 text-right text-white bg-indigo-600 rounded-l-full md:mr-64 w-80 hover:bg-white md:text-indigo-600'>
					books in spanisH
				</li>
			</NavLink>
			<NavLink to='/livres' onClick={handleNavLinkClick}>
				<li className='pt-1 pr-4 text-right text-white bg-indigo-600 rounded-l-full md:mr-80 w-80 hover:bg-white md:text-indigo-600'>
					books in frencH
				</li>
			</NavLink>
			<NavLink to='/buecher' onClick={handleNavLinkClick}>
				<li className='pt-1 pr-4 text-right text-white bg-indigo-600 rounded-l-full md:mr-96 w-80 hover:bg-white md:text-indigo-600'>
					books in germaN
				</li>
			</NavLink>
			<NavLink to='/authors' onClick={handleNavLinkClick}>
				<li className='md:mr-[28rem] pt-1 pr-4 text-right bg-indigo-600 rounded-l-full w-80 hover:bg-white text-white md:text-indigo-600'>
					authorS
				</li>
			</NavLink>
			<NavLink to='/illustrators' onClick={handleNavLinkClick}>
				<li className='md:mr-[33rem] pt-1 pr-4 text-right bg-indigo-600 rounded-l-full w-80 hover:bg-white text-white md:text-indigo-600'>
					illustratorS
				</li>
			</NavLink>
			<NavLink to='/publishers' onClick={handleNavLinkClick}>
				<li className='md:mr-[37rem] pt-1 pr-4 text-right bg-indigo-600 rounded-l-full w-80 hover:bg-white text-white md:text-indigo-600'>
					publisherS
				</li>
			</NavLink>
			<NavLink to='/registration' onClick={handleNavLinkClick}>
				<li className='md:mr-[41rem] pt-1 pr-4 text-right bg-indigo-600 rounded-l-full w-80 hover:bg-white text-white md:text-indigo-600'>
					registratioN
				</li>
			</NavLink>
			<NavLink to='/login' onClick={handleNavLinkClick}>
				<li className='md:mr-[46rem] pt-1 pr-4 text-right bg-indigo-600 rounded-l-full w-80 hover:bg-white text-white md:text-indigo-600'>
					logiN
				</li>
			</NavLink>
			{/* </div> */}
		</ul>
	);
};

export default SpreadMenu;
