import { useForm, useFieldArray } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import http from "../utils/http";
import { useContext, useState } from "react";
import { SingleBookInfo } from "../types/SingleBookInfo";
import AuthorForm from "./AuthorForm";
import IllustratorForm from "./IllustratorForm";
import { handleEntityExistence } from "../utils/handleEntityExistence";

const BookForm = () => {
	// State variables and their corresponding set functions
	const [isAuthorFormVisible, setAuthorFormVisibility] =
		useState<boolean>(false);
	const [isIllustratorFormVisible, setIllustratorFormVisibility] =
		useState<boolean>(false);
	const [authorCheck, setAuthorCheck] = useState(false);
	const [illustratorCheck, setIllustratorCheck] = useState(false);
	const { auth, setAuth } = useContext(AuthContext);

	const handleCheckAuthor = async (exists: boolean) => {
		if (exists) {
			// Handle logic when author exists
			console.log("Author already exists!");
		} else {
			// Handle logic when author doesn't exist
			console.log("Author does not exist. You can add them.");
		}
	};

	const handleCheckIllustrator = async (exists: boolean) => {
		if (exists) {
			// Handle logic when illustrator exists
			console.log("Illustrator already exists!");
		} else {
			// Handle logic when illustrator doesn't exist
			console.log("Illustrator does not exist. You can add them.");
		}
	};

	const openAuthorForm = () => {
		setAuthorFormVisibility(true);
	};

	const closeAuthorForm = () => {
		setAuthorFormVisibility(false);
	};

	const openIllustratorForm = () => {
		setIllustratorFormVisibility(true);
	};

	const closeIllustratorForm = () => {
		setIllustratorFormVisibility(false);
	};

	const handleCheckAuthorExistence = async (authorIndex: number) => {
		const exists = await handleEntityExistence(
			form,
			authorIndex,
			"authors",
			"Author",
			"/api/auth/author_existence_check",
			handleCheckAuthor,
			openAuthorForm,
			closeAuthorForm
		);

		setAuthorCheck(exists);

		return exists;
	};

	const handleCheckIllustratorExistence = async (illustratorIndex: number) => {
		const exists = await handleEntityExistence(
			form,
			illustratorIndex,
			"illustrators",
			"Illustrator",
			"/api/auth/illustrator_existence_check",
			handleCheckIllustrator,
			openIllustratorForm,
			closeIllustratorForm
		);

		setIllustratorCheck(exists);

		return exists;
	};

	const form = useForm<SingleBookInfo>();
	// const form = useForm<SingleBookInfo>({
	// 	defaultValues: {
	// 		title: '',
	// 		isbn: '',
	// 		description: '',
	// 		author: [{ first_name: "", last_name: "" }],
	// 		illustrator: [{ first_name: "", last_name: "" }],
	// 		publisher: '',
	// 		print_date: '',
	// 		original_language: '',
	// 		cover: ''
	// 	},
	// });

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = form;
	const { fields: authorFields } = useFieldArray({
		control,
		name: "authors",
	});
	const { fields: illustratorFields } = useFieldArray({
		control,
		name: "illustrators",
	});

	const onSubmit = async (data: SingleBookInfo) => {
		console.log(data);
		try {
			// // Request CSRF token
			// await http.get("/sanctum/csrf-cookie");
			// Make the registration request
			const response = await http.post("api/auth/book/create", data);

			// Extract user data from the response
			const userData = response.data;

			// Update the authentication context
			setAuth({ ...userData, isAdmin: userData.is_admin ?? false });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (exception: any) {
			const errors = exception.response.data.errors;

			for (const [fieldName, errorList] of Object.entries(errors)) {
				const fieldErrors = (errorList as any[]).map((message) => ({
					control,
					message,
				}));
				setError(fieldName as keyof SingleBookInfo, fieldErrors[0]);
				// Define the type for your form fields
				type Field =
					| "title"
					| "isbn"
					| "description"
					| "author"
					| "illustrator"
					| "publisher"
					| "print_date"
					| "original_language"
					| "cover";

				// Map the error messages and set them using setError
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const errors = (errorList as any[]).map((message) => ({ message }));
				setError(fieldName as Field, errors[0]);
			}
		}
	};
	return (
		<form
			className='flex flex-col gap-5 px-10 md:w-[40rem] mb-36 md:mb-0'
			noValidate>
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
			{/* Author Input */}
			<div className='mb-4 bg-slate-300'>
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
									{...register(`authors.${authorIndex}.first_name`, {
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
									{...register(`authors.${authorIndex}.last_name`, {
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

							<button
								disabled={isSubmitting}
								className='text-indigo-500 bg-white border-2 border-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
								type='button'
								onClick={async () => {
									const exists = await handleCheckAuthorExistence(authorIndex);

									// If authorCheck is true, the author exists, and the form is closed
									if (exists) {
										console.log(`Great! Author exists already.`);
									}

									// If authorCheck is false, the author does not exist, and the form is opened
									if (!exists) {
										console.log(`No matches found. Go ahead and add one.`);
										openAuthorForm();
									}
								}}>
								Check Author
							</button>

							{/* Check if authorCheck is false and render message */}
							{!authorCheck && isAuthorFormVisible && (
								<div className='mt-2 text-sm text-right text-cyan-500'>
									No matches found. Go ahead and add one.
								</div>
							)}

							{/* Display message when authorCheck is true and form is not visible */}
							{authorCheck && !isAuthorFormVisible && (
								<p className='mt-2 text-sm text-right text-slate-500'>
									Great! Author exists already and you need not enter his
									details!
								</p>
							)}

							{/* Render AuthorForm and pass the function to close it */}
							{isAuthorFormVisible && (
								<AuthorForm onCloseForm={closeAuthorForm} />
							)}
						</div>
					</div>
				))}
			</div>
			{/* Illustrator Input */}
			<div className='mb-4 bg-slate-300'>
				<label
					className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
					htmlFor='illustrator'>
					Illustrator:
				</label>
				{illustratorFields.map((field, illustratorIndex) => (
					<div key={field.id} className='flex flex-col gap-4'>
						<div className='flex flex-col'>
							<div className='flex flex-col'>
								<label
									className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
									htmlFor={`illustrators.${illustratorIndex}.first_name`}>
									First Name:
								</label>
								<input
									{...register(`illustrators.${illustratorIndex}.first_name`, {
										required: "First name is required",
									})}
									className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
									type='text'
									placeholder='First Name'
								/>
								{errors.illustrators?.[illustratorIndex]?.first_name && (
									<p className='mt-2 text-sm text-right text-cyan-500'>
										{
											errors.illustrators?.[illustratorIndex]?.first_name
												?.message
										}
									</p>
								)}
							</div>
							<div>
								<label
									className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
									htmlFor={`illustrators.${illustratorIndex}.last_name`}>
									Last Name:
								</label>
								<input
									{...register(`illustrators.${illustratorIndex}.last_name`, {
										required: "Last name is required",
									})}
									className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
									type='text'
									placeholder='Last Name'
								/>
								{errors.illustrators?.[illustratorIndex]?.last_name && (
									<p className='mt-2 text-sm text-right text-cyan-500'>
										{
											errors.illustrators?.[illustratorIndex]?.last_name
												?.message
										}
									</p>
								)}
							</div>
						</div>
						{/* Button to check illustrator existence */}
						<button
							disabled={isSubmitting}
							className='text-indigo-500 bg-white border-2 border-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
							type='button'
							onClick={async () => {
								const exists = await handleCheckIllustratorExistence(
									illustratorIndex
								);

								// If illustratorCheck is true, the illustrator exists, and the form is closed
								if (exists) {
									console.log(`Great! Illustrator exists already.`);
								}

								// If illustratorCheck is false, the illustrator does not exist, and the form is opened
								if (!exists) {
									console.log(`No matches found. Go ahead and add one.`);
									openIllustratorForm();
								}
							}}>
							Check Illustrator
						</button>
					</div>
				))}

				{/* Check if illustratorCheck is false and render message */}
				{!illustratorCheck && isIllustratorFormVisible && (
					<div className='mt-2 text-sm text-right text-cyan-500'>
						No matches found. Go ahead and add one.
					</div>
				)}

				{/* Display message when illustratorCheck is true and form is not visible */}
				{illustratorCheck && !isIllustratorFormVisible && (
					<p className='mt-2 text-sm text-right text-slate-500'>
						Great! Illustrator exists already and you need not enter their
						details!
					</p>
				)}

				{/* Render IllustratorForm and pass the function to close it */}
				{isIllustratorFormVisible && (
					<IllustratorForm onCloseForm={closeIllustratorForm} />
				)}
			</div>
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
					disabled={isSubmitting}
					className='py-2 pl-8 pr-3 mb-24 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
					type='submit'
					onClick={() => handleSubmit(onSubmit)}>
					Add Book
				</button>
			</div>
		</form>
	);
};

export default BookForm;
