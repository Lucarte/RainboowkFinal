// import { useHistory } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import { SingleBookInfo } from "../types/SingleBookInfo";
import { handleEntityExistence } from "../utils/handleEntityExistence";
import AuthorField from "./AuthorField";
import IllustratorField from "./IllustratorField";
import PublisherField from "./PublisherField";
import http from "../utils/http";

const BookForm = () => {
	const { user } = useContext(AuthContext);

	// State variables and their corresponding set functions
	const [isAuthorFormVisible, setAuthorFormVisibility] =
		useState<boolean>(false);
	const [isIllustratorFormVisible, setIllustratorFormVisibility] =
		useState<boolean>(false);
	const [isPublisherFormVisible, setPublisherFormVisibility] =
		useState<boolean>(false);
	const [authorCheck, setAuthorCheck] = useState(false);
	const [illustratorCheck, setIllustratorCheck] = useState(false);
	const [publisherCheck, setPublisherCheck] = useState(false);

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

	const handleCheckPublisher = async (exists: boolean) => {
		if (exists) {
			// Handle logic when publisher exists
			console.log("Publisher already exists!");
		} else {
			// Handle logic when publisher doesn't exist
			console.log("Publisher does not exist. You can add them.");
		}
	};

	// Manage form visibility from authors/illustrators/publisher
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

	const openPublisherForm = () => {
		setPublisherFormVisibility(true);
	};

	const closePublisherForm = () => {
		setPublisherFormVisibility(false);
	};

	const form = useForm<SingleBookInfo>({
		defaultValues: {
			authors: [{ first_name: "", last_name: "" }],
			illustrators: [{ first_name: "", last_name: "" }],
			publisher: { name: "" }, // Initialize the publisher field
		},
	});

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

	const handleCheckPublisherExistence = async (publisherIndex: number) => {
		const exists = await handleEntityExistence(
			form,
			publisherIndex,
			"publisher",
			"Publisher",
			"/api/auth/publisher_existence_check",
			handleCheckPublisher,
			openPublisherForm,
			closePublisherForm
		);

		setPublisherCheck(exists);

		return exists;
	};

	const submitBook = async (formData: SingleBookInfo) => {
		const userId = user?.id;

		console.log("User ID:", userId);
		console.log("Book Data:", formData);

		try {
			await http.get("/sanctum/csrf-cookie");

			// Continue with the rest of your code
			const authorId = await handleCheckAuthorExistence(0);
			const illustratorId = await handleCheckIllustratorExistence(0);
			const publisherId = await handleCheckPublisherExistence(0);

			// Use FormData for handling file uploads
			const formData = new FormData();
			formData.append("user_id", userId.toString());
			formData.append("ISBN", form.getValues().ISBN);
			formData.append("title", form.getValues().title);
			formData.append("description", form.getValues().description);
			formData.append("authors", JSON.stringify([{ id: authorId }]));
			formData.append("illustrators", JSON.stringify([{ id: illustratorId }]));
			formData.append("publisher", JSON.stringify({ id: publisherId }));
			formData.append("print_date", form.getValues().print_date);
			formData.append("original_language", form.getValues().original_language);
			formData.append("image_path", form.getValues().image_path[0]);

			// Make the book creation request
			const response = await http.post("/api/auth/book/create", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Accept: "application / json",
				},
			});

			// Handle the response as needed
			console.log(response.data);
		} catch (exception: any) {
			// Handle errors
			console.error("Error creating book:", exception);

			const { response } = exception;

			if (response && response.status === 404) {
				// Display a user-friendly message when the publisher is not found
				setError("publisher", {
					message:
						"Selected publisher not found. Please choose an existing publisher or add a new one.",
				});
			} else if (response && response.data && response.data.message) {
				// Display the server's error message
				setError("root", { message: response.data.message });
			} else {
				// Handle generic error, e.g., server down or network error
				setError("root", {
					message: "There was a problem saving the book. Please try again!",
				});
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit(submitBook)}
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
					<AuthorField
						key={field.id}
						register={register}
						errors={errors}
						authorIndex={authorIndex}
						handleCheckAuthorExistence={handleCheckAuthorExistence}
						openAuthorForm={openAuthorForm}
						closeAuthorForm={closeAuthorForm}
						authorCheck={authorCheck}
						isAuthorFormVisible={isAuthorFormVisible}
					/>
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
					<IllustratorField
						key={field.id}
						register={register}
						errors={errors}
						illustratorIndex={illustratorIndex}
						handleCheckIllustratorExistence={handleCheckIllustratorExistence}
						openIllustratorForm={openIllustratorForm}
						closeIllustratorForm={closeIllustratorForm}
						illustratorCheck={illustratorCheck}
						isIllustratorFormVisible={isIllustratorFormVisible}
					/>
				))}
			</div>

			{/* Publisher Input */}
			<div className='mb-4 bg-slate-300'>
				<label
					className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
					htmlFor='publisher'>
					Publisher:
				</label>

				<PublisherField
					register={register}
					errors={errors}
					publisherIndex={0}
					handleCheckPublisherExistence={handleCheckPublisherExistence}
					openPublisherForm={openPublisherForm}
					closePublisherForm={closePublisherForm}
					publisherCheck={publisherCheck}
					isPublisherFormVisible={isPublisherFormVisible}
				/>
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
					placeholder='yyyy-mm-dd'
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
					{...register("image_path", {
						required: "Please upload a cover",
					})}
					className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
					type='file'
					placeholder='Cover'
					aria-invalid={errors.image_path ? "true" : "false"}
				/>
				<p className='mt-2 text-sm text-right text-cyan-500'>
					{errors.image_path?.message}
				</p>
			</div>

			<div className='mt-10 mb-4 text-right '>
				<button
					disabled={isSubmitting}
					className='py-2 pl-8 pr-3 mb-24 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'>
					Add Book
				</button>
			</div>
		</form>
	);
};

export default BookForm;
