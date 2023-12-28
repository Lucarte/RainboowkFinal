import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

type Props = {
	isAdmin: boolean;
};

const ProtectedLayout = ({ isAdmin }: Props) => {
	const { auth } = useContext(AuthContext);
	const location = useLocation();

	return auth.isAdmin ? (
		<Outlet />
	) : (
		<>
			<Navigate to={"/login"} state={{ from: location }} replace />
			{/* <Navigate to={"/unauthorized"} state={{ from: location }} replace /> */}
		</>
	);
};

export default ProtectedLayout;
