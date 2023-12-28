import { useContext, useEffect, useState } from "react";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import http from "../utils/http";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
	const { auth, setAuth } = useContext(AuthContext);
	const [isActive, setIsActive] = useState(false);

	const getInitialAuth = async () => {
		try {
			console.log("Before API call - auth.username:", auth.username);

			if (auth.username) {
				const response = await http.get(`api/auth/user/${auth.username}`);
				setAuth({ ...response.data, isAdmin: false });

				console.log("After API call - auth.username:", auth.username);
			}
		} catch (error) {
			console.error("Error fetching initial auth:", error);
		}
	};

	useEffect(() => void getInitialAuth(), []);

	const handleLogout = async () => {
		try {
			await http.post("/api/auth/logout");
			setAuth(defaultAuth);
		} catch {
			//
		}
	};

	return (
		<>
			<Header
				handleLogout={handleLogout}
				isActive={isActive}
				setIsActive={setIsActive}
				onClose={onclose}
			/>
			{/* <BookCatalog /> */}
			<Footer />
		</>
	);
};

export default RootLayout;
