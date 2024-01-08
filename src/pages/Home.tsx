import { NavLink } from "react-router-dom";
import homeShort from "../assets/homeShort.mp4";
import staticImg from "../assets/staticImg.png";

const Home = () => {
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
								<NavLink to='/login'>Login</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 -mr-[3px] w-8 rounded-lg rounded-b-none rotate-[7deg] h-32'>
							<div className='text-xl font-comfortaa pb-24 pr-28 font-bold text-violet-900 -rotate-[89deg]'>
								<NavLink to='/registration'>Register</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 w-8 -mr-[1px] rounded-lg rounded-b-none rotate-[9deg] h-40'>
							<div className='text-2xl font-archivo pb-32 pr-36 text-cyan-500 -rotate-[90deg]'>
								<NavLink to='/'>CATALOG</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 w-8 rounded-lg rounded-b-none rotate-[11deg] h-48'>
							<div className='text-lg tracking-wider font-kids2 pb-40 pr-44 font-bold text-violet-900 -rotate-[90deg]'>
								<NavLink to='/about'>The_Project</NavLink>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Home;
