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
			const userData = response.data;

			setAuth({ ...userData, isAdmin: userData.isAdmin ?? false });
			console.log("Formular Submitted", auth);
			navigate(from);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (exception: any) {
			const errors = exception.response.data.errors;

			for (const [fieldName, errorList] of Object.entries(errors)) {
				type Field = "email" | "password" | "root";
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const errors = (errorList as any[]).map((message) => ({ message }));
				console.log(fieldName, errors);
				setError(fieldName as Field, errors[0]);
			}
		}
	};

	// This shows us when there are errors
	const onError = () => {
		console.log("Formular ERROR");
	};

	return (
		<>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit, onError)}
				className='p-56 flex flex-col gap-3'>
				<label htmlFor='email'>E-Mail</label>
				<input
					className='p-2 pl-3'
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
				<br />
				<label htmlFor='password'>Password</label>
				<input
					className='p-2 pl-3'
					placeholder='Password'
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
				<br />
				<button disabled={isSubmitting}>Login</button>
			</form>
			<DevTool control={control} />
		</>
	);
};

export default Login;
