import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ProtectedLayout = () => {
	const { auth } = useContext(AuthContext);
	const location = useLocation();

	return auth.isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate
			to='/login'
			state={{ from: location, message: "First login to continue" }}
			replace
		/>
	);
};

export default ProtectedLayout;
