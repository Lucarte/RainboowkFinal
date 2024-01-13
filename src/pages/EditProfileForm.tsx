// import React, { useState } from "react";
import http from "../utils/http";
import { useForm } from "react-hook-form";

type FormValues = {
	id: number;
	pronouns?: string;
	salutation: "Dear Individual" | "Dear Person" | "Dear child" | "Mrs." | "Mr";
	username: string;
	email: string;
	dob: string;
	locality: "Within Germany" | "Outside Germany";
	personRole:
		| "Author"
		| "Child"
		| "Librarian"
		| "Opposed to the Biodiversity"
		| "Publisher Representative"
		| "Activist"
		| "Binary World Defender"
		| "Journalist"
		| "Curious Person";
	password?: string;
	passwordConfirmation?: string;
};

type EditProfileFormProps = {
	userInfo: FormValues;
	onCancel: () => void;
	onUpdate: (updatedUserInfo: FormValues) => void;
	onDelete: (userId: number) => void;
};

const EditProfileForm: React.FC<EditProfileFormProps> = ({
	userInfo,
	onCancel,
	onUpdate,
	onDelete,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: userInfo,
	});

	const handleFormSubmit = async (data: FormValues) => {
		try {
			// Make a PATCH request to update the user profile
			const response = await http.patch(
				`/api/auth/user/${userInfo.username}`,
				data
			);
			onUpdate(response.data.user);
			onCancel();
		} catch (error) {
			console.error("Error updating user profile:", error);
		}
	};

	const handleDeleteUser = async () => {
		try {
			// Fetch CSRF token if necessary
			await http.get("/sanctum/csrf-cookie");

			// Make a DELETE request to delete the user profile
			await http.delete(`/api/auth/user/${userInfo.username}`);
			onDelete(userInfo.id);
		} catch (error) {
			console.error("Error deleting user profile:", error);

			// Log the detailed error response
			// console.log("Detailed error response:", response);

			// Display a user-friendly error message
			alert("Failed to delete user profile. Please try again later.");
		}
	};
	// // Will take place if there are errors
	// const onError = () => {
	// 	console.log("Errored");
	// };

	// Options for my Salutation Select Field
	const greetOptions = [
		"Dear Individual",
		"Dear Person",
		"Dear Child",
		"Mrs.",
		"Mr.",
	];

	// Options for my Locality (radio input) Field
	const localityOptions = [
		{ value: "Within Germany", label: "within germanY" },
		{ value: "Beyond Germany", label: "beyond germanY" },
	];

	// Options for my PersonRole Select Field
	const roleOptions = [
		"Author",
		"Child",
		"Librarian",
		"Opposed to the Biodiversity",
		"Publisher Representative",
		"Activist",
		"Binary World Defender",
		"Journalist",
		"Curious Person",
	];

	return (
		<form
			className='flex flex-col gap-5 px-10 md:w-[40rem] mb-36 md:mb-0'
			onSubmit={handleSubmit(handleFormSubmit)}>
			{/* Pronouns Field */}
			<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
				<label htmlFor='pronouns' className='text-right'>
					: pronouns
				</label>
				<input
					className='px-1 border-2 border-indigo-200 rounded-md focus:outline-indigo-700 md:w-56'
					type='text'
					placeholder='elle, xier, they...'
					{...register("pronouns")}
				/>
			</div>

			{/* Salutation Field */}
			<div className='flex flex-col'>
				<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
					<label htmlFor='salutation' className='text-right'>
						: salutation
					</label>
					<select
						className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:outline-indigo-700'
						aria-invalid={errors.salutation ? "true" : "false"}
						{...register("salutation", {
							required: {
								value: true,
								message: "please select a salutatioN",
							},
						})}
						defaultValue=''>
						<option disabled value=''>
							Please select...
						</option>
						{greetOptions.map((value) => (
							<option key={value} value={value}>
								{value}
							</option>
						))}
					</select>
				</div>
				<p className='mt-2 text-sm text-right text-indigo-700'>
					{errors.salutation?.message}
				</p>
			</div>

			{/* Username Field */}
			<div className='flex flex-col'>
				<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
					<label htmlFor='username' className='text-right'>
						: username
					</label>
					<input
						className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:border-indigo-700 focus:outline-none'
						{...register("username", { required: "Please enter a username." })}
					/>
				</div>
				<p className='mt-2 text-sm text-right text-indigo-700'>
					{errors.username?.message}
				</p>
			</div>

			{/* Email Field */}
			<div className='flex flex-col'>
				<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
					<label htmlFor='email' className='text-right'>
						: email
					</label>
					<input
						className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:border-indigo-700 focus:outline-none'
						{...register("email", {
							required: "Please enter an email.",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email format",
							},
						})}
					/>
				</div>
				<p className='mt-2 text-sm text-right text-indigo-700'>
					{errors.email?.message}
				</p>
			</div>

			{/* DOB Field */}
			<div className='flex flex-col'>
				<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
					<label htmlFor='dob' className='text-right'>
						: date of birth
					</label>
					<input
						className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:border-indigo-700 focus:outline-none'
						{...register("dob", {
							required: "Please enter your date of birth.",
							pattern: {
								value: /^\d{4}-\d{2}-\d{2}$/,
								message: "Please use yyyy-mm-dd format.",
							},
						})}
					/>
				</div>
				<p className='mt-2 text-sm text-right text-indigo-700'>
					{errors.dob?.message}
				</p>
			</div>

			{/* Locality Field */}
			<div className='flex flex-col'>
				<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
					<label htmlFor='locality' className='text-right'>
						: locality
					</label>
					<div className=' md:flex-col'>
						{localityOptions.map((option) => (
							<div className='flex justify-end gap-3' key={option.value}>
								<label htmlFor='{`locality_${option.value}`}' className=''>
									{option.label}
								</label>
								<input
									className='text-indigo-500 focus:border-indigo-700 focus:outline-none'
									aria-invalid={errors.locality ? "true" : "false"}
									type='radio'
									{...register("locality", {
										required: {
											value: true,
											message: "please select a localitY",
										},
									})}
									value={option.value}
								/>
							</div>
						))}
						<p className='mt-2 text-sm text-right text-indigo-700'>
							{errors.locality?.message}
						</p>
					</div>
				</div>
			</div>

			{/* Person Role Field */}
			<div className='flex flex-col'>
				<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
					<label htmlFor='personRole' className='text-right'>
						: person role
					</label>
					<select
						className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:outline-indigo-700'
						aria-invalid={errors.personRole ? "true" : "false"}
						{...register("personRole", {
							required: {
								value: true,
								message: "please make a choicE",
							},
						})}
						defaultValue=''>
						<option disabled value=''>
							Please select...
						</option>
						{roleOptions.map((value) => (
							<option value={value} key={value}>
								{value}
							</option>
						))}
					</select>
				</div>
				<p className='mt-2 text-sm text-right text-indigo-700'>
					{errors.personRole?.message}
				</p>
			</div>

			{/* Password Field */}
			<div className='flex flex-col'>
				<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
					<label htmlFor='password' className='text-right'>
						: password
					</label>
					<input
						className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:border-indigo-700 focus:outline-none'
						{...register("password", { minLength: 8 })}
						type='password'
						placeholder='New Password'
					/>
				</div>
				<p className='mt-2 text-sm text-right text-indigo-700'>
					{errors.password?.message}
				</p>
			</div>

			{/* Password Confirmation Field */}
			<div className='flex flex-col'>
				<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
					<label htmlFor='passwordConfirmation' className='text-right'>
						: password confirmation
					</label>
					<input
						className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:border-indigo-700 focus:outline-none'
						{...register("passwordConfirmation", {
							validate: (value) => value === userInfo.password,
						})}
						type='password'
						placeholder='Confirm Password'
					/>
				</div>
				<p className='mt-2 text-sm text-right text-indigo-700'>
					{errors.passwordConfirmation?.message}
				</p>
			</div>

			<button type='submit'>Save Changes</button>
			<button type='button' onClick={handleDeleteUser} className='text-red-500'>
				Delete Account
			</button>
			<button type='button' onClick={onCancel}>
				Cancel
			</button>
		</form>
	);
};

export default EditProfileForm;
