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
import { handleEntityExistence } from "../utils/handleEntityExistence";

const BookForm = () => {
	// State variables and their corresponding set functions
	const [isAuthorFormVisible, setAuthorFormVisibility] =
		useState<boolean>(false);
	const [isIllustratorFormVisible, setIllustratorFormVisibility] =
		useState<boolean>(false);
	const [authorCheck, setAuthorCheck] = useState(false);
	const [illustratorCheck, setIllustratorCheck] = useState(false);
	const { auth } = useContext(AuthContext);

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

	const form = useForm<SingleBookInfo>({
		defaultValues: {
			authors: [{ first_name: "", last_name: "" }],
			illustrators: [{ first_name: "", last_name: "" }],
		},
	});

	const { control, formState } = form;
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

	return (
		<form
			className='flex flex-col gap-5 px-10 md:w-[40rem] mb-36 md:mb-0'
			noValidate>
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

							<button
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
							{isAuthorFormVisible && <AuthorForm />}
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
						</div>
						{/* Button to check illustrator existence */}
						<button
							className='text-indigo-500 bg-white border-2 border-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
							type='button'
							onClick={() => handleCheckIllustratorExistence(illustratorIndex)}>
							Check Illustrator
						</button>
					</div>
				))}
				{/* Log the values before calling handleEntityExistence */}
				{console.log("isIllustratorFormVisible:", isIllustratorFormVisible)}
				{console.log("illustratorCheck:", illustratorCheck)}

				{/* Check if illustratorCheck is false and render message */}
				{!illustratorCheck && isIllustratorFormVisible && (
					<div className='mt-2 text-sm text-right text-cyan-500'>
						No matches found. Go ahead and add one.
					</div>
				)}

				{/* Display message when illustratorCheck is true and form is not visible */}
				{illustratorCheck && !isIllustratorFormVisible && (
					<p className='mt-2 text-sm text-right text-slate-500'>
						Great! Illustrator exists already, and you need not enter details!
					</p>
				)}

				{/* Render IllustratorForm and pass the function to close it */}
				{isIllustratorFormVisible && (
					<IllustratorForm onCloseForm={closeIllustratorForm} />
				)}
			</div>

			<div className='mt-10 mb-4 text-right '>
				<button
					className='py-2 pl-8 pr-3 mb-24 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
					type='submit'
					onClick={() =>
						handleCheckEntityExistence(
							form, // Pass the form instance
							illustratorIndex,
							"illustrators",
							"Author",
							"/api/auth/author_existence_check",
							checkEntityExists,
							openIllustratorForm,
							closeIllustratorForm,
							AuthorForm // Pass the AuthorForm component
						)
					}>
					Add Book
				</button>
			</div>
		</form>
	);
};

export default BookForm;
