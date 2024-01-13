import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import http from "../utils/http";
import { useContext, useState } from "react";
import { FormValues } from "../types/UserFormValues";

const Registration = () => {
	const { auth, setAuth } = useContext(AuthContext);
	const navigate = useNavigate();
	// const { state } = useLocation();
	const form = useForm<FormValues>();
	const {
		register,
		// control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = form;

	// Will take place if all fields are validated
	const onSubmit = async (data: FormValues) => {
		console.log(data);
		try {
			// Request CSRF token
			await http.get("/sanctum/csrf-cookie");
			// Make the registration request
			const response = await http.post("api/auth/register", data);

			// Extract user data from the response
			const userData = response.data;

			// Update the authentication context
			setAuth({ ...userData, isAdmin: userData.is_admin ?? false });

			// First success message, then navigate to the login
			navigate("/login", {
				state: {
					successMessage:
						"You are now part of the RainBOOwK family! Now go ahead and...",
				},
			});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (exception: any) {
			// Handle registration errors
			const errors = exception.response.data.errors;

			for (const [fieldName, errorList] of Object.entries(errors)) {
				const fieldErrors = (errorList as any[]).map((message) => ({
					message,
				}));
				setError(fieldName as keyof FormValues, fieldErrors[0]);
				// Define the type for your form fields
				type Field =
					| "salutation"
					| "username"
					| "email"
					| "dob"
					| "locality"
					| "personRole"
					| "publicity"
					| "password"
					| "passwordConfirmation"
					| "terms";
				// | "root";

				// Map the error messages and set them using setError
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const errors = (errorList as any[]).map((message) => ({ message }));
				setError(fieldName as Field, errors[0]);
			}
		}
	};

	// Will take place if there are errors
	const onError = () => {
		console.log("Errored");
	};

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

	// Options for my Publicity Select Field
	const publicityOptions = ["Mouthword", "Online Search", "Other"];

	return (
		<>
			<article className='flex flex-col items-center md:rounded-full md:mb-44 md:bg-slate-50 md:px-16 md:pb-40'>
				<h1 className='text-center md:w-[40rem] pt-0 mb-10 md:pt-12 text-2xl md:text-2xl rounded-b-lg md:mb-20 text-slate-700 md:px-28 md:bg-slate-50'>
					-- R e G i S t R a T i O n --
				</h1>
				<form
					className='flex flex-col gap-5 px-10 md:w-[40rem] mb-36 md:mb-0'
					noValidate
					onSubmit={handleSubmit(onSubmit, onError)}>
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

			{/* <DevTool control={control} /> */}
		</>
	);
};

export default Registration;
