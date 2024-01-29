import React, { useContext, useState } from "react";
import http from "../utils/http";
import UpdateProfileForm from "./UpdateProfileForm";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { FormValues } from "../types/UserFormValues";

const UpdateProfile: React.FC<FormValues> = ({ username }) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleUpdateClick = async () => {
		if (!username) {
			navigate("/api/auth/users");
			return;
		}

		const isProfileOwner = user?.username === username;
		const isAdmin = user?.isAdmin;

		if (isProfileOwner || isAdmin) {
			setLoading(true);

			try {
				// Fetch user data for pre-filling the update form (optional)
				const response = await http.get(`/api/auth/profile/${username}`);
				const userData = response.data.user;

				const updatedUserData = {
					pronouns: "Updated Pronouns", // Replace with the actual updated value
					salutation: "Updated Salutation", // Replace with the actual updated value
					email: "updated@example.com", // Replace with the actual updated value
					dob: "2022-01-01", // Replace with the actual updated value
					locality: "Updated Locality", // Replace with the actual updated value
					personRole: "Updated Person Role", // Replace with the actual updated value
					publicity: "Updated Publicity", // Replace with the actual updated value
				};

				// Send the PATCH request with the updated data
				await http.patch(
					`/api/auth/update_profile/${username}`,
					updatedUserData
				);

				// Fetch the updated user data again
				const updatedResponse = await http.get(`/api/auth/profile/${username}`);

				setShowUpdateForm(true);
			} catch (error) {
				setError("Error preparing update form");
				console.error("Error preparing update form:", error);
			} finally {
				setLoading(false);
			}
		} else {
			console.error("Unauthorized update attempt");
		}
	};

	return (
		<div>
			<NavLink
				to={`/api/auth/update_profile/${username}`}
				className='px-3 py-1 bg-white rounded-full'
				onClick={handleUpdateClick}>
				Update Profile
			</NavLink>

			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			{showUpdateForm && <UpdateProfileForm username={username} />}
		</div>
	);
};

export default UpdateProfile;
