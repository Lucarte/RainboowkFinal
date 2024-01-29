import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { defaultAuth } from "../utils/auth";
import http from "../utils/http";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
	const { auth, setAuth } = useContext(AuthContext);
	const [isActive, setIsActive] = useState(false);
	const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

	const getInitialAuth = async () => {
		try {
			if (auth.username) {
				const response = await http.get(`api/auth/profile/${auth.username}`);
				setAuth({ ...response.data, isAdmin: false });
			}
		} catch (error) {
			console.error("Error fetching initial auth:", error);
		}
	};

	useEffect(() => {
		void getInitialAuth();
	}, []);

	const handleLogout = async () => {
		try {
			await http.post("/api/auth/user/logout");
			setAuth(defaultAuth);
			// setLogoutMessage("See you next time, {auth.username}!");
			alert(`See you next time, ${auth.username}!

HAVE FUN READING`);
		} catch (error) {
			console.error("Error logging out:", error);
			setLogoutMessage("Error logging out. Please try again.");
		}
	};

	return (
		<>
			<Header isActive={isActive} setIsActive={setIsActive} />
			{/* <BookCatalog /> */}
			{/* {logoutMessage && (
				<div className='text-xl text-white logout-message'>{logoutMessage}</div>
			)} */}
			<Footer handleLogout={handleLogout} />
		</>
	);
};

export default RootLayout;

// homeShort credit:
// Video by Lara Jameson: https://www.pexels.com/video/sky-blue-dark-standing-9363798/
