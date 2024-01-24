import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import http from "../utils/http";
import DeleteProfile from "./DeleteProfile";
import UpdateProfile from "./UpdateProfile";
import { NavLink } from "react-router-dom";

interface User {
	username: string;
	id: number;
	salutation: string;
	pronouns: string;
	dob: string;
	email: string;
	locality: string;
	personRole: string;
	publicity: string;
	created_at: string;
	updated_at: string;
}

const UsersList = () => {
	const { auth } = useContext(AuthContext);
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await http.get("api/auth/users");
				console.log("Response from server:", response.data);

				setUsers(response.data.users);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		if (auth.isAdmin) {
			fetchUsers();
		}
	}, [auth.isAdmin]);
	console.log("Users state:", users);

	// const handleUpdate = async (username: string) => {
	// 	navigate(`/api/auth/${username}`);
	// };

	// const handleDelete = async () => {
	// 	// Refresh the user list after a delete
	// 	await fetchUsers();
	// };

	if (users.length === 0) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<article className='flex flex-col gap-5 text-center'>
				<h1 className='text-xl'>--WELCOME ADMIN--</h1>
				<h2 className='pb-8 font-black'>User's List: </h2>
				<div className='flex flex-col gap-3 text-cyan-700'>
					{users.map((user) => (
						<div
							key={user.id}
							className='px-20 py-5 text-center bg-orange-300 rounded-full'>
							<span className='font-bold'>Username: </span> {user.username}
							<div>
								<span className='font-bold'>Salutation: </span>{" "}
								{user.salutation}
							</div>
							<div>
								<span className='font-bold'>Pronouns: </span> {user.pronouns}
							</div>
							<div>
								<span className='font-bold'>Date of Birth: </span> {user.dob}
							</div>
							<div>
								<span className='font-bold'>E-Mail: </span> {user.email}
							</div>
							<div>
								<span className='font-bold'>Locality: </span> {user.locality}
							</div>
							<div>
								<span className='font-bold'>Role: </span>
								{user.personRole}
							</div>
							<div>
								<span className='font-bold'>Found us: </span> {user.publicity}
							</div>
							<div>
								<span className='font-bold'>Profile created on: </span>{" "}
								{user.created_at}
							</div>
							<div>
								<span className='font-bold'>Profile updated on: </span>{" "}
								{user.updated_at}
							</div>
							<div className='flex justify-center gap-2 m-5'>
								{/* Link to the user's profile */}
								<NavLink to={`/api/auth/user/${user.username}`}>
									View Profile
								</NavLink>
								<button className='px-3 py-1 bg-white rounded-full'>
									<UpdateProfile
										username={user.username}
										onUpdate={handleUpdate}
									/>
									Update Profile
								</button>
								<button className='px-3 py-1 bg-white rounded-full'>
									<DeleteProfile
										username={user.username}
										onDelete={handleDelete}
									/>
									Delete Profile
								</button>
							</div>
						</div>
					))}
				</div>
			</article>
		</>
	);
};

export default UsersList;
