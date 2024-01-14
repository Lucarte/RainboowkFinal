import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import http from "../utils/http";
import { useContext } from "react";
import {
	IllustratorInfo,
	PublisherInfo,
	SingleBookInfo,
} from "../types/SingleBookInfo";
import { AxiosError } from "axios";
import { AuthorInfo } from "../types/AuthorInfo";

const BookForm = () => {
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();
	const form = useForm<SingleBookInfo>();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = form;

	const onSubmit = async (data: SingleBookInfo) => {
		try {
			// Request CSRF token
			await http.get("/sanctum/csrf-cookie");

			// Make the book creation request
			const response = await http.post("/api/books/create", data);

			// Handle success (you may want to redirect or show a success message)
			console.log(response.data);
		} catch (exception: unknown) {
			if (exception instanceof AxiosError) {
				// Handle AxiosError
				if (exception.response) {
					const errors = exception.response.data.errors;

					for (const [fieldName, errorList] of Object.entries(errors)) {
						// Specify the type of message as string
						const fieldErrors = (errorList as string[]).map((message) => ({
							message,
						}));

						// Map the error messages and set them using setError
						const mappedErrors = (errorList as string[]).map((message) => ({
							message,
						}));
						setError(fieldName as Field, mappedErrors[0]);
					}
				}
			} else {
				// Handle other types of exceptions
				console.error(exception);
			}
		}
	};
	return (
		<>
			<form
				className='flex flex-col gap-5 px-10 md:w-[40rem] mb-36 md:mb-0'
				noValidate
				onSubmit={handleSubmit(onSubmit)}>
				{/* Title Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='title'>
						titlE :
					</label>
					<input
						{...register("title", {
							required: "Please enter a title.",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='title'
						aria-invalid={errors.title ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.title?.message}
					</p>
				</div>
				{/* ISBN Input */}
				<div className='mb-4'>
					<label
						htmlFor='ISBN'
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'>
						: ISBN
					</label>
					<input
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						aria-invalid={errors.ISBN ? "true" : "false"}
						type='text'
						placeholder='ISBN'
						{...register("ISBN", {
							required: "ISBN is required",
							pattern: {
								value: /^\d+$/,
								message: "Please enter a valid ISBN (numeric characters only).",
							},
						})}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.ISBN?.message}
					</p>
				</div>
				{/* Description Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='description'>
						descriptioN :
					</label>
					<input
						{...register("description", {
							required: "Please enter a description.",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='description'
						aria-invalid={errors.description ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.description?.message}
					</p>
				</div>
				{/* Author Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='author'>
						authoR :
					</label>
					<input
						{...register("authors[0].fullname", {
							required: "Author name is required",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Author'
						aria-invalid={errors.authors?.[0]?.fullname ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.authors?.[0]?.fullname &&
							errors.authors?.[0]?.fullname.message}
					</p>
				</div>
				{/* Illustrator Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='illustrator'>
						illustratoR :
					</label>
					<input
						{...register("illustrators[0].fullname", {
							required: "Illustrator name is required",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Illustrator'
						aria-invalid={errors.illustrators?.[0]?.fullname ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.illustrators?.[0]?.fullname &&
							errors.illustrators?.[0]?.fullname.message}
					</p>
				</div>
				{/* Publisher Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='publisher'>
						publisheR :
					</label>
					<input
						{...register("publisher.name", {
							required: "Please enter a publisher.",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='publisher'
						aria-invalid={errors.publisher ? "true" : "false"}
					/>

					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.publisher?.message}
					</p>
				</div>
				{/* Print Date Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='print_date'>
						print datE :
					</label>
					<input
						{...register("print_date", {
							required: "Please enter a print date.",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='yyy-mm-dd'
						aria-invalid={errors.print_date ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.print_date?.message}
					</p>
				</div>
				{/* Original Language Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='original_language'>
						original languagE :
					</label>
					<input
						{...register("original_language", {
							required: "Please enter the original language.",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='original_language'
						aria-invalid={errors.original_language ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.original_language?.message}
					</p>
				</div>
				{/* Cover Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='cover'>
						coveR :
					</label>
					<input
						{...register("cover", {
							required: "Please upload a cover.",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='file'
						placeholder='cover'
						aria-invalid={errors.cover ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.cover?.message}
					</p>
				</div>
				{/* Submit button */}
				<div className='mt-10 mb-4 text-right '>
					<button
						className='py-2 pl-8 pr-3 mb-24 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
						type='submit'>
						add booK
					</button>
				</div>
			</form>
		</>
	);
};

export default BookForm;

// ----------------------
//
// OLD CODE
//
//
// -------------------------

// import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// // import { SingleBookInfo } from "../types/SingleBookInfo";
// import { useNavigate } from "react-router-dom";

// const BookForm = () => {
// 	const { register, handleSubmit } = useForm();
// 	const navigate = useNavigate();

// 	const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
// 		try {
// 			// Use the form data as needed, for example, send it to an API
// 			console.log("Form data:", data);
// 			// Redirect to a different page after successful submission
// 			navigate("/book/create"); // Replace with the appropriate path
// 		} catch (error) {
// 			console.error("Error submitting form:", error);
// 			// Handle error appropriately, e.g., show an error message to the user
// 		}
// 	};

// 	return (
// 		<>
// 			<article className=''>
// 				<h1 className='pb-10 font-bold text-center'>FILL OUT BOOK DETAILS</h1>
// 				<figure className=''>
// 					{/* Button to redirect to Authors form
// 					<div className='flex flex-col gap-6 mb-4 text-right '>
// 						<button
// 							className='py-2 pl-8 pr-3 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
// 							type='submit'>
// 							<p className='flex flex-col gap-1 text-right'>
// 								add author detailS
// 							</p>
// 						</button>
// 					</div> */}
// 					{/* Button to redirect to Illustrators form
// 					<div className='flex flex-col gap-6 mb-4 text-right '>
// 						<button
// 							className='py-2 pl-8 pr-3 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
// 							type='submit'>
// 							<p className='flex flex-col gap-1 text-right'>
// 								add illustrator detailS
// 							</p>
// 						</button>
// 					</div> */}

// 					<br />
// 					{/*

//                     HERE BEGINS THE ACTUAL FORM

//                     */}
// 					<form
// 						className='max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg'
// 						onSubmit={handleSubmit(handleFormSubmit)}>
// 						{/* <h1 className='pb-8 font-semibold text-cyan-500'>Other Details:</h1> */}
// 						{/* Title Input */}
// 						<div className='mb-4'>
// 							<label
// 								className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500 '
// 								htmlFor='title'>
// 								titlE :
// 							</label>
// 							<input
// 								{...register("title", { required: true })}
// 								className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
// 								type='text'
// 								placeholder='title'
// 							/>
// 						</div>
// 						<div className='mb-4'>
// 							<label
// 								className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
// 								htmlFor='isbn'>
// 								isbN :
// 							</label>
// 							<input
// 								{...register("isbn", { required: true })}
// 								className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
// 								type='text'
// 								placeholder='ISBN'
// 							/>
// 						</div>
// 						<div className='mb-4'>
// 							<label
// 								className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
// 								htmlFor='description'>
// 								descriptioN :
// 							</label>
// 							<input
// 								{...register("description", { required: true })}
// 								className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
// 								type='text'
// 								placeholder='description'
// 							/>
// 						</div>
// 						<div className='mb-4'>
// 							<label
// 								className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
// 								htmlFor='author'>
// 								authoR :
// 							</label>
// 							<input
// 								{...register("author", { required: true })}
// 								className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
// 								type='text'
// 								placeholder='author'
// 							/>
// 						</div>
// 						<div className='mb-4'>
// 							<label
// 								className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
// 								htmlFor='illustrator'>
// 								illustratoR :
// 							</label>
// 							<input
// 								{...register("illustrator", { required: true })}
// 								className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
// 								type='text'
// 								placeholder='illustrator'
// 							/>
// 						</div>
// 						<div className='mb-4'>
// 							<label
// 								className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
// 								htmlFor='publisher'>
// 								publisheR :
// 							</label>
// 							<input
// 								{...register("publisher", { required: true })}
// 								className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
// 								type='text'
// 								placeholder='publisher'
// 							/>
// 						</div>
// 						<div className='mb-4'>
// 							<label
// 								className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
// 								htmlFor='print_date'>
// 								print datE :
// 							</label>
// 							<input
// 								{...register("print_date", { required: true })}
// 								className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
// 								type='text'
// 								placeholder='yyy-mm-dd'
// 							/>
// 						</div>
// 						<div className='mb-4'>
// 							<label
// 								className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
// 								htmlFor='original_language'>
// 								original languagE :
// 							</label>
// 							<input
// 								{...register("original_language", { required: true })}
// 								className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
// 								type='text'
// 								placeholder='original_language'
// 							/>
// 						</div>
// 						<div className='mb-4'>
// 							<label
// 								className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
// 								htmlFor='cover'>
// 								coveR :
// 							</label>
// 							<input
// 								{...register("cover", { required: true })}
// 								className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
// 								type='file'
// 								placeholder='cover'
// 							/>
// 						</div>

// 						{/* Other input fields go here... */}
// 						{/* Submit button */}
// 						<div className='mt-10 mb-4 text-right '>
// 							<button
// 								className='py-2 pl-8 pr-3 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
// 								type='submit'>
// 								add booK
// 							</button>
// 						</div>
// 					</form>
// 				</figure>
// 			</article>
// 		</>
// 	);
// };

// export default BookForm;
