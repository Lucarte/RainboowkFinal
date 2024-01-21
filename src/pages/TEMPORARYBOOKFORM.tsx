import {
	useForm,
	useFieldArray,
	SubmitHandler,
	FieldValues,
} from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import http from "../utils/http";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { SingleBookInfo } from "../types/SingleBookInfo";
import AuthorForm from "./AuthorForm";
import IllustratorForm from "./IllustratorForm";
// import {
// 	FormFunctions,
// 	GeneralFormProvider,
// 	useGeneralFormContext,
// } from "../context/GeneralFormContext";
// import { useFormFunctions } from "../utils/UseFormFunctions";
import { handleCheckEntityExistence } from "../utils/handleCheckEntityExistence";

const BookForm = () => {
	// const {
	// 	isFormVisible = false,
	// 	openForm,
	// 	closeForm,
	// 	handleCheckForm,
	// }: FormFunctions = useGeneralFormContext()!;

	// Use the HOF to get illustrator form functions
	// const illustratorFormFunctions = useFormFunctions();
	// const authorFormFunctions = useFormFunctions();

	// Access the functions and states for each form
	// Destructure the functions and states
	// const {
	// 	isFormVisible: isAuthorFormVisible,
	// 	openForm: openAuthorForm,
	// 	closeForm: closeAuthorForm,
	// 	handleCheckForm: handleCheckAuthor,
	// } = authorFormFunctions;

	// const {
	// 	isFormVisible: isIllustratorFormVisible,
	// 	openForm: openIllustratorForm,
	// 	closeForm: closeIllustratorForm,
	// 	handleCheckForm: handleCheckIllustrator,
	// } = illustratorFormFunctions;

	// const handleCloseAuthorForm = () => {
	// 	closeAuthorForm();
	// 	// Show an alert when the author is successfully added
	// 	alert("Author successfully added!");
	// };

	// const handleCloseIllustratorForm = () => {
	// 	closeIllustratorForm();
	// 	// Show an alert when the illustrator is successfully added
	// 	alert("Illustrator successfully added!");
	// };

	const [authorCheck, setAuthorCheck] = useState(false);
	const [illustratorCheck, setIllustratorCheck] = useState(false);
	const { auth } = useContext(AuthContext);

	const form = useForm<SingleBookInfo>({
		defaultValues: {
			authors: [{ first_name: "", last_name: "" }],
			illustrators: [{ first_name: "", last_name: "" }],
		},
	});

	const { control, formState } = form;
	// const { handleSubmit, register, control, formState, setError } = form;
	const { errors, isSubmitting } = formState;
	const { fields: authorFields } = useFieldArray({
		control,
		name: "authors",
	});
	const { fields: illustratorFields } = useFieldArray({
		control,
		name: "illustrators",
	});

	const handleCheckAuthorExistence = async (authorIndex: number) => {
		const exists = await handleCheckEntityExistence(
			authorIndex,
			"authors",
			"Author",
			"/api/auth/author_existence_check",
			handleCheckAuthor,
			openAuthorForm,
			handleCloseAuthorForm
		);

		return exists;
	};

	
	};

	// // PERTAINING TO AUTHORS
	// const handleCheckAuthorExistence = async (authorIndex: number) => {
	// 	// Call the handleCheckForm function provided by useFormFunctions
	// 	const exists = await handleCheckAuthor(() =>
	// 		checkAuthorExists(authorIndex)
	// 	);

	// 	// Update the visibility of AuthorForm based on the result
	// 	if (!exists) {
	// 		openAuthorForm();
	// 	} else {
	// 		console.log(
	// 			"Great! Author exists already, and you need not enter details!"
	// 		);
	// 		handleCloseAuthorForm();
	// 	}

	// 	// Ensure exists is a boolean value
	// 	return Boolean(exists);
	// };

	// const checkAuthorExists = async (...args: unknown[]): Promise<boolean> => {
	// 	// Extract the authorIndex from the arguments
	// 	const authorIndex = args[0] as number;
	// 	// Get the current author values from the form state
	// 	const authors = form.getValues("authors");
	// 	const author = authors[authorIndex];

	// 	if (author && author.first_name && author.last_name) {
	// 		try {
	// 			// Make a request to the server to check author existence
	// 			const response = await http.get("/api/auth/author_existence_check", {
	// 				params: {
	// 					first_name: author.first_name,
	// 					last_name: author.last_name,
	// 				},
	// 			});

	// 			console.log(response);

	// 			// Return the existence status from the response
	// 			return response.data.exists;
	// 		} catch (error) {
	// 			console.error("Error checking author existence:", error);
	// 			return false; // Return false in case of an error
	// 		}
	// 	}

	// 	return false; // Return false if author details are missing
	// };

	// // PERTAINING TO ILLUSTRATORS
	// const handleCheckIllustratorExistence = async (illustratorIndex: number) => {
	// 	const exists = await handleCheckIllustrator(() =>
	// 		checkIllustratorExists(illustratorIndex)
	// 	);

	// 	// Update the visibility of IllustratorForm based on the result
	// 	if (!exists) {
	// 		openIllustratorForm();
	// 	} else {
	// 		handleCloseIllustratorForm();
	// 	}

	// 	// Ensure exists is a boolean value
	// 	return Boolean(exists);
	// };

	// const checkIllustratorExists = async (
	// 	...args: unknown[]
	// ): Promise<boolean> => {
	// 	// Extract the illustratorIndex from the arguments
	// 	const illustratorIndex = args[0] as number;

	// 	// Get the current illustrator values from the form state
	// 	const illustrators = form.getValues("illustrators");
	// 	const illustrator = illustrators[illustratorIndex];

	// 	if (illustrator && illustrator.first_name && illustrator.last_name) {
	// 		try {
	// 			// Make a request to the server to check illustrator existence
	// 			const response = await http.get(
	// 				"/api/auth/illustrator_existence_check",
	// 				{
	// 					params: {
	// 						first_name: illustrator.first_name,
	// 						last_name: illustrator.last_name,
	// 					},
	// 				}
	// 			);

	// 			console.log(response);

	// 			// Return the existence status from the response
	// 			return response.data.exists;
	// 		} catch (error) {
	// 			console.error("Error checking illustrator existence:", error);
	// 			return false; // Return false in case of an error
	// 		}
	// 	}

	// 	return false; // Return false if illustrator details are missing
	// };

	return (
		<>
		// <GeneralFormProvider>
			<form
				className='flex flex-col gap-5 px-10 md:w-[40rem] mb-36 md:mb-0'
				noValidate
				// onSubmit={handleSubmit(onSubmit)} implement this later from previous checks
			>
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
									onClick={() => handleCheckAuthorExistence}>
									Check Author
								</button>
							</div>
							{/* Check if authorCheck is false and render message */}
							{!authorCheck && isAuthorFormVisible && (
								<div className='mt-2 text-sm text-right text-cyan-500'>
									No matches found. Go ahead and add one.
								</div>
							)}

							{/* Render AuthorForm and pass the function to close it */}
							{isAuthorFormVisible && (
								<AuthorForm onCloseForm={handleCloseAuthorForm} />
							)}

							{authorCheck && (
								<p className='mt-2 text-sm text-right text-slate-500'>
									Great! Author exists already and you need not enter his
									details!
								</p>
							)}
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
										htmlFor={`illustrators[${illustratorIndex}].first_name`}>
										First Name:
									</label>
									<input
										{...form.register(
											`illustrators.${illustratorIndex}.first_name`,
											{
												required: "First name is required",
											}
										)}
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
										{...form.register(
											`illustrators.${illustratorIndex}.last_name`,
											{
												required: "Last name is required",
											}
										)}
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
								{/* Button to check illustrator existence */}
								<button
									className='text-indigo-500 bg-white border-2 border-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
									type='button'
									onClick={() => handleCheckIllustratorExistence}>
									Check Illustrator
								</button>
							</div>
							{/* Check if illustratorCheck is false and render message */}
							{!illustratorCheck && isIllustratorFormVisible && (
								<div className='mt-2 text-sm text-right text-cyan-500'>
									No matches found. Go ahead and add one.
								</div>
							)}

							{/* Render IllustratorForm and pass the function to close it */}
							{isIllustratorFormVisible && (
								<IllustratorForm onCloseForm={handleCloseIllustratorForm} />
							)}

							{illustratorCheck && (
								<p className='mt-2 text-sm text-right text-slate-500'>
									Great! Illustrator exists already, and you need not enter
									details!
								</p>
							)}
						</div>
					))}
				</div>

				<div className='mt-10 mb-4 text-right '>
					<button
						className='py-2 pl-8 pr-3 mb-24 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
						type='submit'>
						Add Book
					</button>
				</div>
			</form>
		// </GeneralFormProvider>
		</>
	);
};
export default BookForm;
