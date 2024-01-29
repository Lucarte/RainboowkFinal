import React from "react";
import http from "../utils/http";

interface DeleteUserProps {
	username: string;
	onDelete: () => void;
}

const DeleteProfile: React.FC<DeleteUserProps> = ({ username, onDelete }) => {
	const handleDelete = async () => {
		try {
			// Implement your delete logic here
			// For example, delete the user with a DELETE request
			await http.delete(`/api/auth/profile/${username}`);

			// After successful delete, refresh the user list
			onDelete();
		} catch (error) {
			console.error("Error deleting profile:", error);
		}
	};

	return (
		<button className='px-3 py-1 bg-white rounded-full' onClick={handleDelete}>
			Delete Profile
		</button>
	);
};

export default DeleteProfile;
