import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const UsersList = () => {
	const { auth } = useContext(AuthContext);
	// if (auth.isAdmin){}
	auth.isAdmin ?? "false";
	return (
		<>
			<h1>--WELCOME ADMIN--</h1>
			<div>UsersList</div>
		</>
	);
};

export default UsersList;
