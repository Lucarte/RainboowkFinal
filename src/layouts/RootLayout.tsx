import { useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import http from "../utils/http";

const RootLayout = () => {
	const { auth, setAuth } = useContext(AuthContext);

	const getInitialAuth = async () => {
		try {
			const response = await http.get("api/auth/user");
			setAuth({ ...response.data, role: "user" });
		} catch {
			//
		}
	};

	useEffect(() => void getInitialAuth(), []);

	const handleLogout = () => {
		setAuth(defaultAuth);
		const handleLogout = async () => {
			try {
				await http.post("/api/auth/logout");
				setAuth(defaultAuth);
			} catch {
				//
			}
		};
	};

	return (
		<>
			<header>
				<nav>
					<ul>
						<li>
							<NavLink to='/'>Home</NavLink>
						</li>
						<li>
							<NavLink to='/dashboard'>Dashboard</NavLink>
						</li>
						<li>
							<NavLink to='/profile'>Profile</NavLink>
						</li>
						<li>
							<NavLink to='/blog'>Blog</NavLink>
						</li>
					</ul>
					{auth.id ? (
						<div>
							<p>You are logged in as: {auth.username}</p>
							<button className='text-orange-500' onClick={handleLogout}>
								Logout
							</button>
						</div>
					) : (
						<NavLink to='/login'>Login</NavLink>
					)}
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
