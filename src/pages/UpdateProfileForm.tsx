import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import http from "../utils/http";
import { FormValues } from "../types/UserFormValues";

// Import options
import {
	greetOptions as salutationOptions,
	localityOptions,
	roleOptions,
	publicityOptions,
} from "../types/UserEnumOptions";

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

const UpdateProfileForm: React.FC<User> = ({ username }) => {
	const navigate = useNavigate();
	const form = useForm<FormValues>();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = form;

	// Use greetOptions directly, no need to redeclare
	const greetOptions: readonly string[] = salutationOptions;

	const onSubmit = async (data: FormValues) => {
		try {
			// Make the update request
			await http.patch(`/api/auth/profile/${username}`, data);

			// Redirect or show a success message
			navigate("/api/auth/profile/${username}", {
				state: { successMessage: "Profile updated successfully" },
			});
		} catch (error) {
			// Handle update errors
			const errors = error.response.data.errors;

			for (const [fieldName, errorList] of Object.entries(errors)) {
				const fieldErrors = (errorList as any[]).map((message) => ({
					message,
				}));
				setError(fieldName as keyof FormValues, fieldErrors[0]);
			}
		}
	};

	return (
		<article className='flex flex-col items-center md:rounded-full md:mb-44 md:bg-slate-50 md:px-16 lg:px-[14rem] 2xl:px-[30rem] md:pb-40'>
			<h1 className='text-center md:w-[40rem] pt-0 mb-10 md:pt-12 text-2xl md:text-2xl rounded-b-lg md:mb-20 text-slate-700 md:px-28 md:bg-slate-50'>
				-- U p D a T e P r O f I l E --
			</h1>
			<form
				className='flex flex-col gap-5 px-10 md:w-[40rem] mb-36 md:mb-0'
				noValidate
				onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
					<label htmlFor='pronouns' className='text-right'>
						: pronounS
					</label>
					<input
						className='px-1 border-2 border-indigo-200 rounded-md focus:outline-indigo-700 md:w-56'
						type='text'
						placeholder='elle, xier, they...'
						{...register("pronouns", {})}
					/>
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
						<label htmlFor='salutation' className='text-right'>
							: salutatioN
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
				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
						<label htmlFor='username' className='text-right'>
							: usernamE
						</label>
						<input
							className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:border-indigo-700 focus:outline-none'
							aria-invalid={errors.username ? "true" : "false"}
							type='text'
							placeholder='username'
							{...register("username", {
								required: "Please enter a username.",
							})}
						/>
					</div>
					<p className='mt-2 text-sm text-right text-indigo-700'>
						{errors.username?.message}
					</p>
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
						<label htmlFor='email' className='text-right'>
							: e-maiL
						</label>
						<input
							className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:border-indigo-700 focus:outline-none'
							aria-invalid={errors.email ? "true" : "false"}
							type='email'
							placeholder='you@mail.com'
							{...register("email", {
								required: {
									value: true,
									message: "please enter an emaiL",
								},
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "invalid email formaT",
								},
							})}
						/>
					</div>
					<p className='mt-2 text-sm text-right text-indigo-700'>
						{errors.email?.message}
					</p>
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
						<label htmlFor='dob' className='text-right'>
							: date of birtH
						</label>
						<input
							className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:border-indigo-700 focus:outline-none'
							aria-invalid={errors.dob ? "true" : "false"}
							type='text'
							placeholder='date of birth'
							{...register("dob", {
								required: {
									value: true,
									message: "please enter you date of birtH",
								},
								pattern: {
									value: /^\d{4}-\d{2}-\d{2}$/,
									message: "please use yyyy-mm-dd formaT",
								},
							})}
						/>
					</div>
					<p className='mt-2 text-sm text-right text-indigo-700'>
						{errors.dob?.message}
					</p>
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
						<label className='text-right' htmlFor='personRole'>
							? what is your role herE
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
				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
						<label className='text-right' htmlFor='publicity'>
							? how did you find out about uS
						</label>
						<select
							className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:outline-indigo-700'
							aria-invalid={errors.publicity ? "true" : "false"}
							{...register("publicity", {
								required: { value: true, message: "please make a choicE" },
							})}
							defaultValue=''>
							<option disabled value=''>
								Please select...
							</option>
							{publicityOptions.map((value) => (
								<option key={value} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
					<p className='mt-2 text-sm text-right text-indigo-700'>
						{errors.publicity?.message}
					</p>
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
						<label htmlFor='password' className='text-right'>
							: passworD
						</label>
						<input
							className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:border-indigo-700 focus:outline-none'
							aria-invalid={errors.password ? "true" : "false"}
							type='password'
							placeholder='password'
							{...register("password", {
								required: "Please enter a password.",
								validate: {
									minLength: (value) =>
										value.length >= 8 ||
										"Password must be at least 8 characters long.",
									lowercase: (value) =>
										/^(?=.*[a-z])/.test(value) ||
										"Password must have at least one small letter.",
									// uppercase: (value) =>
									// 	/^(?=.*[A-Z])/.test(value) ||
									// 	"Password must have at least one capital letter.",
									number: (value) =>
										/^(?=.*\d)/.test(value) ||
										"Password must have at least one number.",
									specialChar: (value) =>
										/^(?=.*[@$!%*?&])/.test(value) ||
										"Password must have at least one special character.",
								},
							})}
						/>
					</div>
					<p className='mt-2 text-sm text-right text-indigo-700'>
						{errors.password?.message}
					</p>
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
						<label className='text-right' htmlFor='passwordConfirmation'>
							: password confirmatioN
						</label>
						<input
							className='px-1 border-2 border-indigo-200 rounded-md md:w-56 focus:border-indigo-700 focus:outline-none'
							aria-invalid={errors.passwordConfirmation ? "true" : "false"}
							type='password'
							placeholder='password confirmation'
							{...register("passwordConfirmation", {
								required: "please re-enter your passworD",
								validate: {
									matchPassword: (value) =>
										value === form.getValues("password") ||
										"Passwords do not match.",
									// value !== "password" ?? "Passwords do not match.",
								},
							})}
						/>
					</div>
					<p className='mt-2 text-sm text-right text-indigo-700'>
						{errors.passwordConfirmation?.message}
					</p>
				</div>
				<div className='flex flex-col gap-2 mt-2 md:flex-row md:justify-between'>
					<p className='text-right md:text-left'>
						? where are you signing up froM
					</p>
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
				<div className='flex flex-col gap-1 pt-8 items-left md:py-10'>
					<div className='flex gap-5'>
						<input
							// className='w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							className='w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 focus:border-indigo-700 focus:outline-none'
							aria-invalid={errors.terms ? "true" : "false"}
							type='checkbox'
							{...register("terms", {
								required: "please accept the terms and conditionS",
							})}
						/>
						<label htmlFor='terms'>
							i accept the{" "}
							<a
								href='#'
								// style does not seem to work
								className='px-1 text-cyan-500 hover:underline focus:outline-indigo-700'>
								terms and conditionS
							</a>
							.
						</label>
					</div>
					<p className='mt-2 ml-[2.2rem] text-sm text-left text-indigo-700'>
						{errors.terms?.message}
					</p>
				</div>
				<div className='flex justify-end md:justify-center md:-mb-12'>
					<button
						disabled={isSubmitting}
						className='px-4 py-2 text-white bg-indigo-500 rounded-md w-fit hover:text-indigo-400 focus:outline-indigo-800'
						type='submit'>
						registeR
					</button>
				</div>
			</form>
		</article>
	);
};

export default UpdateProfileForm;
