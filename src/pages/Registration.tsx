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
		"Please select...",
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
		"Please choose",
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
	const publicityOptions = [
		"Please choose",
		"Mouthword",
		"Online Search",
		"Other",
	];

	return (
		<>
			<form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
				<div>
					<label htmlFor='pronouns'>Pronouns</label>
					<input
						type='text'
						placeholder='elle, xier, they...'
						{...register("pronouns", {})}
					/>
				</div>
				<div>
					<label htmlFor='salutation'>Salutation</label>
					<select
						{...register("salutation", {
							required: "Please select a salutation.",
						})}>
						{greetOptions.map((value) => (
							<option key={value} value={value}>
								{value}
							</option>
						))}
					</select>
					<p className='text-red-700'>{errors.salutation?.message}</p>
				</div>
				<div>
					<label htmlFor='username'>Username</label>
					<input
						aria-invalid={errors.username ? "true" : "false"}
						type='text'
						placeholder='username'
						{...register("username", { required: "Please enter a username." })}
					/>
					<p className='text-red-700'>{errors.username?.message}</p>
				</div>
				<div>
					<label htmlFor='email'>E-Mail</label>
					<input
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
				<p className='text-red-700'>{errors.email?.message}</p>
				<div>
					<label htmlFor='dob'>Date of Birth</label>
					<input
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
								message: "Please enter a valid date in the format YYYY-MM-DD",
							},
						})}
					/>
					<p className='text-red-700'>{errors.dob?.message}</p>
				</div>
				<div>
					<p>Where are you signing up from?</p>
					{localityOptions.map((option) => (
						<div key={option.value}>
							<label htmlFor='{`locality_${option.value}`}'>
								{option.label}
							</label>
							<input
								aria-invalid={errors.locality ? "true" : "false"}
								type='radio'
								{...register("locality", {
									required: "Please select a locality.",
								})}
								value={option.value}
							/>
						</div>
					))}
					<p className='text-red-700'>{errors.locality?.message}</p>
				</div>
				<div>
					<label htmlFor='personRole'>What is your role here?</label>
					<select
						{...register("personRole", {
							required: "Please make a choice.",
						})}>
						{roleOptions.map((value) => (
							<option value={value} key={value}>
								{value}
							</option>
						))}
					</select>
					<p className='text-red-700'>{errors.personRole?.message}</p>
				</div>
				<div>
					<label htmlFor='publicity'>How did you find out about us?</label>
					<select
						{...register("publicity", {
							required: "Please make a choice.",
						})}>
						{publicityOptions.map((value) => (
							<option value={value}>{value}</option>
						))}
					</select>
				</div>
				<p className='text-red-700'>{errors.publicity?.message}</p>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						aria-invalid={errors.publicity ? "true" : "false"}
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
					<p className='text-red-700'>{errors.password?.message}</p>
				</div>
				<div>
					<label htmlFor='terms'>I accept the terms and conditions.</label>
					<input
						aria-invalid={errors.terms ? "true" : "false"}
						type='radio'
						{...register("terms", {
							required: "Please accept the terms and conditions.",
						})}
					/>
					<p className='text-red-700'>{errors.terms?.message}</p>
				</div>
				<div>
					<button disabled={isSubmitting} type='submit'>
						Register
					</button>
				</div>
			</form>
			<DevTool control={control} />
		</>
	);
};

export default Registration;
