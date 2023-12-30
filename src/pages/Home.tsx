import { NavLink } from "react-router-dom";
import homeShort from "../assets/homeShort.mp4";
import staticImg from "../assets/staticImg.png";

const Home = () => {
	return (
		<>
			<div className='-mt-[7.4rem]'>
				<video
					className='border-solid border-r-4 border-l-4 border-indigo-900 w-screen -z-10
					h-full
					object-cover
					absolute'
					autoPlay
					muted
					// loop
					playsInline
					poster={staticImg}>
					<source src={homeShort} type='video/mp4' />
					Your browser does not support the video tag.
				</video>
				<div className='w-screen h-screen flex items-end justify-end overflow-hidden'>
					<ul className='flex h-18 pb-20 gap-2 items-end mr-16'>
						<li className=' bg-indigo-500 px-2 w-8 rounded-lg rounded-b-none rotate-[5deg] h-28'>
							<div className='text-2xl font-rubik pb-20 pr-24 text-cyan-500 -rotate-[89deg]'>
								<NavLink to='/login'>Login</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 w-8 rounded-lg rounded-b-none rotate-[7deg] h-36'>
							<div className='text-xl font-comfortaa pb-28 pr-32 font-bold text-violet-900 -rotate-[89deg]'>
								<NavLink to='/'>CATALOG</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 w-8 rounded-lg rounded-b-none rotate-[9deg] h-44'>
							<div className='text-lg font-kids2 pb-36 pr-40 font-bold text-cyan-500 -rotate-[90deg]'>
								<NavLink to='/about'>The_Project</NavLink>
							</div>
						</li>
						<li className=' bg-indigo-500 px-2 w-8 rounded-lg rounded-b-none rotate-[11deg] h-48'>
							<div className='text-2xl tracking-wider font-archivo pb-40 pr-44 font-bold text-violet-900 -rotate-[90deg]'>
								<NavLink to='/registration'>Registration</NavLink>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Home;
