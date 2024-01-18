import { NavLink } from "react-router-dom";
import homeShort from "../assets/homeShort.mp4";
import staticImg from "../assets/staticImg.png";
import { useState } from "react";

const Home = () => {
	const [isActive, setIsActive] = useState(false);

	const handleNavLinkClick = () => {
		// Set isActive to false when a NavLink is clicked
		setIsActive((prev) => !prev);
	};
	return (
		<>
			<div className='-mt-[7.4rem]'>
				<video
					className='absolute object-cover w-screen h-full border-l-4 border-r-4 border-indigo-900 border-solid -z-10'
					autoPlay
					muted
					// loop
					playsInline
					poster={staticImg}>
					<source src={homeShort} type='video/mp4' />
					Your browser does not support the video tag.
				</video>
				{/* <div className='flex items-end justify-end w-screen h-screen overflow-hidden text-cyan-500'>
					<ul className='flex items-end gap-2 mr-16 h-18 pb-36'>
						<li className=' bg-indigo-500 px-2 w-8 rounded-lg rounded-b-none rotate-[5deg] h-28'>
							<div className='text-xl font-bold font-comfortaa pb-20 pr-24 -rotate-[89deg]'>
								<NavLink to='/login'>LOGIN</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 w-8 rounded-lg rounded-b-none rotate-[7deg] h-36'>
							<div className='text-xl font-comfortaa pb-28 pr-32 font-bold -rotate-[89deg]'>
								<NavLink to='/registration'>REGISTER</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 w-8 rounded-lg rounded-b-none rotate-[9deg] h-44'>
							<div className='text-xl font-comfortaa pb-36 pr-40 font-bold -rotate-[90deg]'>
								<NavLink to='/'>CATALOG</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 w-8 rounded-lg rounded-b-none rotate-[11deg] h-48'>
							<div className='text-xl tracking-wider font-comfortaa pb-40 pr-44 font-bold -rotate-[90deg]'>
								<NavLink to='/about'>THE_PROJECT</NavLink>
							</div>
						</li>
					</ul>
				</div> */}
				<div className='flex items-end justify-end w-screen h-screen overflow-hidden'>
					<ul className='flex items-end gap-2 mr-16 md:mr-80 h-18 pb-36'>
						<li className=' bg-indigo-500 -mr-1 px-2 w-8 rounded-lg rounded-b-none rotate-[5deg] h-24'>
							<div className='text-2xl font-rubik pb-16 pr-[4.7rem] text-cyan-500 -rotate-[89deg]'>
								<NavLink to='/login' onClick={handleNavLinkClick}>
									Login
								</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 -mr-[3px] w-8 rounded-lg rounded-b-none rotate-[7deg] h-32'>
							<div className='text-xl font-comfortaa pb-24 pr-28 font-bold text-violet-900 -rotate-[89deg]'>
								<NavLink to='/' onClick={handleNavLinkClick}>
									CATALOG
								</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 w-8 -mr-[1px] rounded-lg rounded-b-none rotate-[9deg] h-40'>
							<div className='text-2xl font-archivo pb-32 pr-36 text-cyan-500 -rotate-[90deg]'>
								<NavLink to='/auth/book/form' onClick={handleNavLinkClick}>
									{/* <button className=''> */}
									Add_Book
									{/* <NavLink to='/book/create'>English</NavLink> */}
									{/* <NavLink to='/libro/create'>Spanish</NavLink>
							<NavLink to='/livre/create'>French</NavLink>
						<NavLink to='/buch/create'>German</NavLink> */}
									{/* </button> */}
								</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 w-8 rounded-lg rounded-b-none rotate-[11deg] h-48'>
							<div className='text-lg tracking-wider font-kids2 pb-40 pr-44 font-bold text-violet-900 -rotate-[90deg]'>
								<NavLink to='/registration' onClick={handleNavLinkClick}>
									REGISTRATION
								</NavLink>
							</div>
							{/* <div className='text-lg tracking-wider font-kids2 pb-40 pr-44 font-bold text-violet-900 -rotate-[90deg]'>
								<NavLink to='/about' onClick={handleNavLinkClick}>
									The_Project
								</NavLink>
							</div> */}
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Home;
