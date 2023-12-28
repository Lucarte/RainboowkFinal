import { useContext } from "react";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import http from "../utils/http";

const User = () => {
	const { auth, setAuth } = useContext(AuthContext);
	const handleLogout = async () => {
		try {
			await http.post("/api/auth/logout");
			setAuth(defaultAuth);
		} catch {
			//
		}
	};
	if (auth.isAdmin) {
		return (
			<div>
				<p>You are logged in as: {auth.username}</p>
				<button className='text-orange-500' onClick={handleLogout}>
					Logout
				</button>
			</div>
		);
	}
};

export default User;
