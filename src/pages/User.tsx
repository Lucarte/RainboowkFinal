import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import http from "../utils/http";
import EditProfileForm from "./EditProfileForm";
import { FormValues } from "./types"; // Adjust the path accordingly

type UserInfo = {
	pronouns: string;
	salutation: string;
	id: number;
	username: string;
	email: string;
	password: string;
	dob: string;
	locality: string;
	personRole: string;
};

const User: React.FC = () => {
	const { auth } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState<UserInfo>();
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const response = await http.get(`/api/auth/user/${auth.username}`);
				setUserInfo(response.data.user);
			} catch (error) {
				console.error("Error fetching user details:", error);
			}
		};

		fetchUserDetails();
	}, [auth.username]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
	};

	const handleUpdateUser = (updatedUserInfo: FormValues) => {
		setUserInfo(updatedUserInfo);
		setIsEditing(false);
	};

	if (auth.isAdmin || (userInfo && userInfo.id === auth.id)) {
		return (
			<div className='flex flex-col'>
				<h1 className='py-6 font-semibold'>YOUR PROFILE, {auth.username}:</h1>
				{isEditing ? (
					<EditProfileForm
						userInfo={userInfo}
						onCancel={handleCancelEdit}
						onUpdate={handleUpdateUser}
					/>
				) : (
					<div className='flex flex-col gap-3'>
						{/* Render user details as before */}
						<p>Pronouns: {userInfo?.pronouns}</p>
						<p>Salutation: {userInfo?.salutation}</p>
						<p>Username: {userInfo?.username}</p>
						<p>Email: {userInfo?.email}</p>
						<p>DOB: {userInfo?.dob}</p>
						<p>Locality: {userInfo?.locality}</p>
						<p>Person Role: {userInfo?.personRole}</p>
						<div className='pb-40 mt-10 text-center'>
							<button
								onClick={handleEditClick}
								className='px-4 py-2 text-sm text-white bg-indigo-500 rounded-md w-fit hover:text-indigo-400'>
								Edit Profile
							</button>
						</div>
					</div>
				)}
			</div>
		);
	} else {
		return <div>You don't have permission to view this page.</div>;
	}
};

export default User;
