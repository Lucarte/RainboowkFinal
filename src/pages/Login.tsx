import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
	email: string;
	password: string;
};

const Login = () => {
	const form = useForm<FormValues>();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = form;

	// Takes place when all fields filled correctly
	const onSubmit = async () => {
		// Logic for the login
		await new Promise((resolve) => setTimeout(resolve, 3000));
		console.log("Formular Submit");
	};

	// // It has to be an unexpected error
	// throw new Error();

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
						// pattern: {
						// 	value:
						// 		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
						// 	message: `Please enter a valid password: ${(<br></br>)}
						//     -> Min length is 8 characters
						//     -> 1 special character
						//     -> 1 number
						//     -> 1 capital letter
						//     -> 1 small letter`,
						// },
						// minLength: {
						// 	value: 8,
						// 	message: "Min length: 8 characters",
						// },
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
