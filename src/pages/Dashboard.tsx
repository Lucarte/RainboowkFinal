import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
// import { Navigate, useLocation } from "react-router-dom";

const Dashboard = () => {
	const { auth } = useContext(AuthContext);
	// 	const location = useLocation();

	return (
		<div>
			<code>{JSON.stringify(auth)}</code>
			<p>Dashboard this is!</p>
		</div>
	);
	// 	return auth.role ? (
	// 		<div>
	// 			<p>Du hast 1000 pesos VERDIENT!!!</p>
	// 		</div>
	// 	) : (
	// 		<>
	// 			{/* from: /dashboard */}
	// 			<Navigate to={"/login"} state={{ from: location }} replace />
	// 		</>
	// 	);
};

export default Dashboard;
