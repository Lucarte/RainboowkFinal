import {
	useForm,
	useFieldArray,
	SubmitHandler,
	FieldValues,
} from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import http from "../utils/http";
import { useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { SingleBookInfo } from "../types/SingleBookInfo";
import AuthorForm from "./AuthorForm";

const BookForm = () => {
	const { auth } = useContext(AuthContext);
	const form = useForm<SingleBookInfo>({
		defaultValues: {
			authors: [{ first_name: "", last_name: "" }],
		},
	});
	const { handleSubmit, register, control, formState, setError } = form;
	const { errors, isSubmitting } = formState;

	const { fields: authorFields, append: appendAuthor } = useFieldArray({
		control,
		name: "authors",
	});

	// State to manage whether to show the AuthorForm or not
	const [showAuthorForm, setShowAuthorForm] = useState(false);
	const [authorExists, setAuthorExists] = useState(false);

	// useEffect for logging when showAuthorForm changes
	useEffect(() => {
		console.log("State updated:", showAuthorForm);
	}, [showAuthorForm]);

	const checkAuthorExists = async (authorIndex: number) => {
		console.log("Checking author index:", authorIndex);

		// Get the current author values from the form state
		const authors = form.getValues("authors");
		const author = authors[authorIndex];

		if (author && author.first_name && author.last_name) {
			console.log("Checking author existence for:", author);

			try {
				// Make a request to the server to check author existence
				const response = await http.get("/api/auth/author_existance_check", {
					params: {
						first_name: author.first_name,
						last_name: author.last_name,
					},
				});

				console.log(response);

				// Handle the response
				const authorExists = response.data.exists;

				// Set the authorExists state based on the response
				setAuthorExists(authorExists);

				if (!authorExists) {
					// Update the form state with the author ID
					form.setValue(`authors.${authorIndex}.id`, response.data.authorId);
					console.log(response.data.authorId);
				} else {
					// Show AuthorForm
					setShowAuthorForm(true);
				}
			} catch (error) {
				console.error("Error checking author existence:", error);
			}
		}
	};

	// Submit the book (including author ID)
	const submitBook = async (data: SingleBookInfo) => {
		try {
			await http.get("/sanctum/csrf-cookie");

			// Make the book creation request
			const response = await http.post("/api/auth/book/create", data);

			// Handle success (you may want to redirect or show a success message)
			console.log(response.data);
		} catch (exception) {
			// Handle errors
			console.error("Error creating book:", exception);
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			// Request CSRF token
			await http.get("/sanctum/csrf-cookie");

			// Make the book creation request
			const response = await http.post("/api/auth/book/create", data);

			// Check if the author exists and submit the book
			checkAuthorExists(0); // Assuming you are checking the first author

			// Handle success (you may want to redirect or show a success message)
			console.log(response.data);
		} catch (exception: unknown) {
			if (exception instanceof AxiosError) {
				// Handle AxiosError
				if (exception.response) {
					const errors = exception.response.data.errors;

					// Log the entire errors object to the console
					console.log(errors);

					for (const [fieldName, errorList] of Object.entries(errors)) {
						// Specify the type of message as string
						const fieldErrors = (errorList as string[]).map((message) => ({
							message,
						}));

						// Map the error messages and set them using setError
						const mappedErrors = (errorList as string[]).map((message) => ({
							message,
						}));

						// For authors
						setError(`authors.${fieldName}` as keyof SingleBookInfo, {
							type: "manual",
							message: mappedErrors[0].message,
						});

						// For illustrators
						setError(`illustrators.${fieldName}` as keyof SingleBookInfo, {
							type: "manual",
							message: mappedErrors[0].message,
						});

						setError(fieldName as keyof SingleBookInfo, {
							type: "manual",
							message: mappedErrors[0].message,
						});
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
				{/* Author Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='author'>
						Author:
					</label>
					{authorFields.map((field, authorIndex) => (
						<div key={field.id} className='flex flex-col gap-4'>
							<div className='flex flex-col'>
								<div className='flex flex-col'>
									<label
										className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
										htmlFor={`authors[${authorIndex}].first_name`}>
										First Name:
									</label>
									<input
										{...form.register(`authors.${authorIndex}.first_name`, {
											required: "First name is required",
										})}
										className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
										type='text'
										placeholder='First Name'
									/>
									{errors.authors?.[authorIndex]?.first_name && (
										<p className='mt-2 text-sm text-right text-cyan-500'>
											{errors.authors?.[authorIndex]?.first_name?.message}
										</p>
									)}
								</div>
								<div>
									<label
										className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
										htmlFor={`authors.${authorIndex}.last_name`}>
										Last Name:
									</label>
									<input
										{...form.register(`authors.${authorIndex}.last_name`, {
											required: "Last name is required",
										})}
										className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
										type='text'
										placeholder='Last Name'
									/>
									{errors.authors?.[authorIndex]?.last_name && (
										<p className='mt-2 text-sm text-right text-cyan-500'>
											{errors.authors?.[authorIndex]?.last_name?.message}
										</p>
									)}
								</div>
								{/* Button to check author existence */}
								<button
									className='text-indigo-500 bg-white border-2 border-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
									type='button'
									onClick={() => checkAuthorExists(authorIndex)}>
									Check Author
								</button>
							</div>
							{/* Display message based on whether author exists or not */}
							{authorExists ? (
								<p className='mt-2 text-sm text-right text-slate-500'>
									Great! Author exists already and you need not enter his
									details!
								</p>
							) : (
								<p className='mt-2 text-sm text-right text-cyan-500'>
									No matches found. <button></button> Please add the author.
								</p>
							)}
						</div>
					))}
					{/* Button to add author (conditionally show based on showAuthorForm
					state) */}
					{showAuthorForm && (
						<AuthorForm onClose={() => setShowAuthorForm(false)} />
					)}
				</div>

				{/* Title input */}
				<div>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='title'>
						Title:
					</label>
					<input
						{...register("title", {
							required: "Please enter a title",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Title'
						aria-invalid={errors.title ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.title?.message}
					</p>
				</div>
				{/* ISBN Input */}
				<div>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='ISBN'>
						ISBN:
					</label>
					<input
						{...register("ISBN", {
							required: "ISBN is required",
							pattern: {
								value: /^\d+$/,
								message: "Please enter a valid ISBN (numeric characters only)",
							},
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='ISBN'
						aria-invalid={errors.ISBN ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.ISBN?.message}
					</p>
				</div>
				{/* Description Input */}
				<div>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='description'>
						Description:
					</label>
					<input
						{...register("description", {
							required: "Please enter a description",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Description'
						aria-invalid={errors.description ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.description?.message}
					</p>
				</div>
				{/* Illustrator Input */}
				{/* <div className='mb-4'>
        <label
          className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
          htmlFor='illustrator'
        >
          Illustrator:
        </label>
        {illustratorFields.map((field, illustratorIndex) => (
          <div key={field.id}>
            <input
              {...register(
                `illustrators.${illustratorIndex}.fullname` as const,
                {
                  required: "Illustrator name is required",
                }
              )}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
              type='text'
              placeholder='Illustrator'
            />
            {errors.illustrators?.[illustratorIndex]?.fullname && (
              <p className='mt-2 text-sm text-right text-cyan-500'>
                {errors.illustrators?.[illustratorIndex]?.fullname?.message}
              </p>
            )}
          </div>
        ))}
        <button
          type='button'
          onClick={() => appendIllustrator({ fullname: "" })}
        >
          Add Illustrator
        </button>
      </div> */}
				{/* Publisher Input */}
				<div>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='publisher'>
						Publisher:
					</label>
					<input
						{...register("publisher.name", {
							required: "Please enter a publisher",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Publisher'
						aria-invalid={errors.publisher?.name ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.publisher?.name?.message}
					</p>
				</div>
				{/* Print Date Input */}
				<div>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='print_date'>
						Print Date:
					</label>
					<input
						{...register("print_date", {
							required: "Please enter a print date",
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
				<div>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='original_language'>
						Original Language:
					</label>
					<input
						{...register("original_language", {
							required: "Please enter the original language",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Original Language'
						aria-invalid={errors.original_language ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.original_language?.message}
					</p>
				</div>
				{/* Cover Input */}
				<div>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='cover'>
						Cover:
					</label>
					<input
						{...register("cover", {
							required: "Please upload a cover",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='file'
						placeholder='Cover'
						aria-invalid={errors.cover ? "true" : "false"}
					/>
					<p className='mt-2 text-sm text-right text-cyan-500'>
						{errors.cover?.message}
					</p>
				</div>
				<div className='mt-10 mb-4 text-right '>
					<button
						className='py-2 pl-8 pr-3 mb-24 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
						type='submit'>
						Add Book
					</button>
				</div>
			</form>
		</>
	);
};
export default BookForm;
