import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import http from "../utils/http";
import { useContext } from "react";

type FormValues = {
	pronouns?: string;
	salutation: "Dear individual" | "Dear person" | "Dear child" | "Mrs." | "Mr";
	username: string;
	email: string;
	dob: string;
	locality: "within Germany" | "outside Germany";
	personRole:
		| "author"
		| "child"
		| "librarian"
		| "opposed_to_the_biodiversity"
		| "publisher_representative"
		| "activist"
		| "binary_world_defender"
		| "journalist"
		| "curious_person";
	publicity: "mouthword" | "online_search" | "other";
	password: string;
	passwordConfirmation: string;
	terms: boolean;
};

const Registration = () => {
	const { auth, setAuth } = useContext(AuthContext);
	const navigate = useNavigate();
	const { state } = useLocation();
	const form = useForm<FormValues>();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = form;

	// if our 'from' state is empty, then we take the user home
	const { from = "/" } = state || {};

	// Will take place if all fields are validated
	const onSubmit = async (data: FormValues) => {
		try {
			// Request CSRF token
			await http.get("/sanctum/csrf-cookie");

			// Make the registration request
			const response = await http.post("api/auth/register", data);

			// Extract user data from the response
			const userData = response.data;

			// Update the authentication context
			setAuth({ ...userData, isAdmin: userData.isAdmin ?? false });

			// Log success and navigate
			console.log("Registration Successful", auth);
			navigate(from);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (exception: any) {
			// Handle registration errors
			const errors = exception.response.data.errors;
			console.log(exception.response);
			for (const [fieldName, errorList] of Object.entries(errors)) {
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
		{ value: "within_germany", label: "Within Germany" },
		{ value: "beyond_germany", label: "Beyond Germany" },
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
			<article className='flex flex-col items-center'>
				<h1 className='text-slate-600 px-12 md:px-28 pb-2 pt-4 border-t-4 rounded-b-lg bg-slate-100 text-xl mb-10 mt-6'>
					-- R e G i S t R a T i O n --
				</h1>
				<form
					className='flex flex-col gap-5 mb-36 px-10'
					noValidate
					onSubmit={handleSubmit(onSubmit, onError)}>
					<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
						<label htmlFor='pronouns' className=''>
							Pronouns
						</label>
						<input
							className='border-indigo-200 border-2 rounded-md px-1 '
							type='text'
							placeholder='elle, xier, they...'
							{...register("pronouns", {})}
						/>
					</div>
					<div className='flex flex-col'>
						<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
							<label htmlFor='salutation'>Salutation</label>
							<select
								className='border-indigo-200 border-2 rounded-md px-1'
								aria-invalid={errors.salutation ? "true" : "false"}
								{...register("salutation", {
									required: {
										value: true,
										message: "Please select a salutation.",
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
						<p className='text-indigo-700'>{errors.salutation?.message}</p>
					</div>
					<div className='flex flex-col'>
						<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
							<label htmlFor='username'>Username</label>
							<input
								className='border-indigo-200 border-2 rounded-md px-1'
								aria-invalid={errors.username ? "true" : "false"}
								type='text'
								placeholder='username'
								{...register("username", {
									required: "Please enter a username.",
								})}
							/>
						</div>
						<p className='text-indigo-700'>{errors.username?.message}</p>
					</div>
					<div className='flex flex-col'>
						<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
							<label htmlFor='email'>E-Mail</label>
							<input
								className='border-indigo-200 border-2 rounded-md px-1'
								aria-invalid={errors.email ? "true" : "false"}
								type='email'
								placeholder='you@mail.com'
								{...register("email", {
									required: {
										value: true,
										message: "Please enter an email.",
									},
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Invalid email format",
									},
								})}
							/>
						</div>
						<p className='text-indigo-700'>{errors.email?.message}</p>
					</div>
					<div className='flex flex-col'>
						<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
							<label htmlFor='dob'>Date of Birth</label>
							<input
								className='border-indigo-200 border-2 rounded-md px-1'
								aria-invalid={errors.dob ? "true" : "false"}
								type='text'
								placeholder='date of birth'
								{...register("dob", {
									required: {
										value: true,
										message: "Please enter you date of birth.",
									},
									pattern: {
										value: /^\d{4}-\d{2}-\d{2}$/,
										message: "Please use yyyy-mm-dd format",
									},
								})}
							/>
						</div>
						<p className='text-indigo-700'>{errors.dob?.message}</p>
					</div>
					<div className='flex flex-col gap-2'>
						<p>Where are you signing up from?</p>
						{localityOptions.map((option) => (
							<div className='flex gap-3' key={option.value}>
								<input
									className='text-indigo-500'
									aria-invalid={errors.locality ? "true" : "false"}
									type='radio'
									{...register("locality", {
										required: {
											value: true,
											message: "Please select a locality.",
										},
									})}
									value={option.value}
								/>
								<label htmlFor='{`locality_${option.value}`}'>
									{option.label}
								</label>
							</div>
						))}
						<p className='text-indigo-700'>{errors.locality?.message}</p>
					</div>
					<div className='flex flex-col'>
						<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between gap-12'>
							<label htmlFor='personRole'>What is your role here?</label>
							<select
								className='border-indigo-200 border-2 rounded-md px-1'
								aria-invalid={errors.personRole ? "true" : "false"}
								{...register("personRole", {
									required: {
										value: true,
										message: "Please make a choice.",
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
						<p className='text-indigo-700'>{errors.personRole?.message}</p>
					</div>
					<div className='flex flex-col'>
						<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
							<label htmlFor='publicity'>How did you find out about us?</label>
							<select
								className='border-indigo-200 border-2 rounded-md px-1'
								aria-invalid={errors.publicity ? "true" : "false"}
								{...register("publicity", {
									required: { value: true, message: "Please make a choice." },
								})}
								defaultValue=''>
								<option disabled value=''>
									Please select...
								</option>
								{publicityOptions.map((value) => (
									<option value={value}>{value}</option>
								))}
							</select>
						</div>
						<p className='text-indigo-700'>{errors.publicity?.message}</p>
					</div>
					<div className='flex flex-col'>
						<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
							<label htmlFor='password'>Password</label>
							<input
								className='border-indigo-200 border-2 rounded-md px-1'
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
										uppercase: (value) =>
											/^(?=.*[A-Z])/.test(value) ||
											"Password must have at least one capital letter.",
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
						<p className='text-indigo-700'>{errors.password?.message}</p>
					</div>
					<div className='flex flex-col'>
						<div className='flex flex-col gap-2 md:flex-row md:w-full md:justify-between'>
							<label htmlFor='passwordConfirmation'>
								Password Confirmation
							</label>
							<input
								className='border-indigo-200 border-2 rounded-md px-1'
								aria-invalid={errors.passwordConfirmation ? "true" : "false"}
								type='password'
								placeholder='password confirmation'
								{...register("passwordConfirmation", {
									required: "Please re-enter your password.",
									validate: {
										matchPassword: (value) =>
											value !== "password" ?? "Passwords do not match.",
									},
								})}
							/>
						</div>
						<p className='text-indigo-700'>
							{errors.passwordConfirmation?.message}
						</p>
					</div>
					<div className='flex flex-col gap-1 py-10 items-center md:p-10'>
						<div className='flex gap-5'>
							<input
								aria-invalid={errors.terms ? "true" : "false"}
								type='radio'
								{...register("terms", {
									required: "Please accept the terms and conditions.",
								})}
							/>
							<label htmlFor='terms'>I accept the terms and conditions.</label>
						</div>
						<p className='text-indigo-700'>{errors.terms?.message}</p>
					</div>
					<div className='flex justify-center md:justify-start'>
						<button
							disabled={isSubmitting}
							className='md:text-right md:pl-8 bg-indigo-500 py-2 px-4 rounded-md w-fit hover:text-indigo-400 text-white'
							type='submit'>
							registeR
						</button>
					</div>
				</form>
			</article>
			<DevTool control={control} />
		</>
	);
};

export default Registration;
