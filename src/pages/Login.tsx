import { useContext } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import http from "../utils/http";

type FormValues = {
	email: string;
	password: string;
};

const Login = () => {
	const { auth, setAuth } = useContext(AuthContext);
	const navigate = useNavigate();
	const { state } = useLocation();

	// console.log(auth);

	const form = useForm<FormValues>();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = form;

	// Wenn Nutzer von einer Private Route kam
	// dann wollen wir dahin nach Login zurück
	// Wenn er direkt auf Login klickte, schicken wir
	// den Nutzer an die Homepage

	// if our 'from' state is empty, then we take the user home
	const { from = "/" } = state || {};

	// Takes place when all fields validated
	const onSubmit = async (data: FormValues) => {
		try {
			await http.get("/sanctum/csrf-cookie");
			const response = await http.post("api/auth/login", data);
			const userData = response.data.user;
			console.log(userData);

			setAuth({
				...userData,
				isAuthenticated: true,
				isAdmin: userData.is_admin ?? false,
			});
			// setAuth({ ...userData, isAdmin: userData.isAdmin ?? false });
			// await getInitialAuth(setAuth);
			// await getInitialAuth(); // Fetch additional user information
			navigate(from);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (exception: any) {
			const errors = exception.response.data.errors;

			if (errors) {
				for (const [fieldName, errorList] of Object.entries(errors)) {
					type Field = "email" | "password";
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const errors = (errorList as any[]).map((message) => ({ message }));
					setError(fieldName as Field, errors[0]);
				}
			} else {
				// Handle generic error, e.g., server down or network error
				setError("root", {
					message: "Wrong Credentials, TRY AGAIN!",
				});
			}
		}
	};

	// This shows us when there are errors
	const onError = () => {
		console.log("Formular ERROR");
	};

	return (
		<>
			<main className='h-screen'>
				<form
					noValidate
					onSubmit={handleSubmit(onSubmit, onError)}
					className='flex flex-col w-56 gap-6 md:gap-8'>
					{state?.successMessage && (
						<div className='py-4 mb-4 text-lg font-semibold text-center text-cyan-500'>
							{state.successMessage}
						</div>
					)}
					<p className='text-center text-indigo-500'>{errors.root?.message}</p>
					<h1 className='p-4 pb-8 text-xl font-bold text-center'>L o G i N</h1>
					<div className='flex flex-col items-end gap-1 md:gap-2'>
						<label htmlFor='email'>: e-maiL</label>
						<input
							className='w-56 py-1 pl-3 text-sm text-left border-2 border-indigo-200 rounded-md focus:border-indigo-700 focus:outline-none'
							placeholder='your@mail.com'
							type='email'
							aria-invalid={errors.email ? "true" : "false"}
							{...register("email", {
								required: {
									value: true,
									message: "Please enter an email",
								},
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "Invalid email format",
								},
							})}
						/>
						<p className='text-cyan-500'>{errors.email?.message}</p>
					</div>
					<div className='flex flex-col items-end gap-1 md:gap-2'>
						<label htmlFor='password'>: passworD</label>
						<input
							className='w-56 py-1 pl-3 text-sm text-left border-2 border-indigo-200 rounded-md focus:border-indigo-700 focus:outline-none'
							placeholder='password'
							type='password'
							aria-invalid={errors.password ? "true" : "false"}
							{...register("password", {
								required: {
									value: true,
									message: "Please enter a password",
								},
								validate: {
									minLength: (value) =>
										value.length >= 8 ||
										"Passwort muss mindestens 8 Zeichen lang sein",
									lowercase: (value) =>
										/^(?=.*[a-z])/.test(value) ||
										"Passwort muss mindestens einen Kleinbuchstaben enthalten",
									uppercase: (value) =>
										/^(?=.*[A-Z])/.test(value) ||
										"Passwort muss mindestens einen Großbuchstaben enthalten",
									number: (value) =>
										/^(?=.*\d)/.test(value) ||
										"Passwort muss mindestens eine Zahl enthalten",
									specialChar: (value) =>
										/^(?=.*[@$!%*?&])/.test(value) ||
										"Passwort muss mindestens ein Sonderzeichen enthalten",
								},
							})}
						/>
						<p className='text-cyan-500'>{errors.password?.message}</p>
					</div>
					<br />
					<button
						className='px-4 py-2 text-white bg-indigo-500 rounded-md w-fit hover:text-indigo-400 focus:outline-indigo-900 '
						disabled={isSubmitting}>
						Login
					</button>
				</form>
			</main>

			<DevTool control={control} />
		</>
	);
};

export default Login;
