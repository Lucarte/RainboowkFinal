// import { useHistory } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import { SingleBookInfo } from "../types/SingleBookInfo";
import { HandleEntityExistenceProps } from "../types/EntityExistence";
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
	const [authorId, setAuthorId] = useState<number | null>(null);
	const [illustratorId, setIllustratorId] = useState<number | null>(null);
	const [publisherId, setPublisherId] = useState<number | null>(null);

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
		getValues,
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

	// const handleCheckEntityExistence = async ({
	// 	entityName,
	// 	apiEndpoint,
	// 	handleExistence,
	// 	openForm,
	// 	closeForm,
	// }: HandleEntityExistenceProps): Promise<void> => {
	// 	try {
	// 		// Make the existence check request
	// 		const response = await http.get(
	// 			`${apiEndpoint}?entityName=${entityName}&index=0`
	// 		);

	// 		// Assuming the response contains necessary information, extract data
	// 		const { exists, entityId } = response.data;

	// 		if (exists) {
	// 			handleExistence(entityId);
	// 			openForm();
	// 		} else {
	// 			closeForm();
	// 		}
	// 	} catch (error) {
	// 		console.error(`Error checking ${entityName} existence:`, error);
	// 		// Handle errors as needed
	// 		throw error; // Ensure the error is propagated
	// 	}
	// };
	// BookForm.tsx

	// BookForm.tsx

	// BookForm.tsx

	const handleCheckAuthorExistence = async (
		authorIndex: number,
		formData: SingleBookInfo
	): Promise<number | null> => {
		try {
			// Make the existence check request for authors
			const response = await http.get(
				`/api/auth/author_existence_check?first_name=${formData.authors[authorIndex].first_name}&last_name=${formData.authors[authorIndex].last_name}&index=${authorIndex}`
			);

			// Assuming the response contains necessary information, extract data
			const { exists, authorId } = response.data;

			if (exists) {
				console.log(`Author exists with id: ${authorId}`);
				return authorId; // Return the authorId when found
			} else {
				console.log(`No author found`);
				return null; // Return null when not found
			}
		} catch (error) {
			console.error(`Error checking author existence:`, error);
			// Handle errors as needed
			throw error; // Ensure the error is propagated
		}
	};

	const handleCheckIllustratorExistence = async (): Promise<number | null> => {
		try {
			await handleCheckEntityExistence({
				entityName: "Illustrator",
				apiEndpoint: "/api/auth/illustrator_existence_check",
				handleExistence: setIllustratorId,
				openForm: () => setIllustratorFormVisibility(true),
				closeForm: () => setIllustratorFormVisibility(false),
			});
			return illustratorId; // Return the illustratorId after existence check
		} catch (error) {
			console.error("Error checking illustrator existence:", error);
			return null;
		}
	};

	const handleCheckPublisherExistence = async (): Promise<number | null> => {
		try {
			await handleCheckEntityExistence({
				entityName: "Publisher",
				apiEndpoint: "/api/auth/publisher_existence_check",
				handleExistence: setPublisherId,
				openForm: () => setPublisherFormVisibility(true),
				closeForm: () => setPublisherFormVisibility(false),
			});
			return publisherId; // Return the publisherId after existence check
		} catch (error) {
			console.error("Error checking publisher existence:", error);
			return null;
		}
	};

	const submitBook = async (formData: SingleBookInfo) => {
		const userId = user?.id;

		console.log("User ID:", userId);
		console.log("Book Data:", formData);

		// Get the IDs directly from existence checks
		const authorId = await handleCheckAuthorExistence(
			formData.authors[0].first_name,
			formData.authors[0].last_name
		);

		try {
			await http.get("/sanctum/csrf-cookie");

			// Get the IDs directly from existence checks
			const authorId = await handleCheckAuthorExistence();
			const illustratorId = await handleCheckIllustratorExistence();
			const publisherId = await handleCheckPublisherExistence();

			// Use FormData for handling file uploads
			const formDataToSend = new FormData();
			formDataToSend.append("user_id", userId?.toString() ?? "");
			formDataToSend.append("ISBN", formData.ISBN);
			formDataToSend.append("title", formData.title);
			formDataToSend.append("description", formData.description);
			formDataToSend.append("author_id", (authorId ?? 0).toString());
			formDataToSend.append("illustrator_id", (illustratorId ?? 0).toString());
			formDataToSend.append("publisher_id", (publisherId ?? 0).toString());
			formDataToSend.append("print_date", formData.print_date);
			formDataToSend.append("original_language", formData.original_language);
			formDataToSend.append("image_path", formData.image_path[0]);

			// Make the book creation request
			const response = await http.post(
				"/api/auth/book/create",
				formDataToSend,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Accept: "application/json",
					},
				}
			);

			// Handle the response as needed
			console.log(response.data);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
						getValues={getValues}
						handleCheckAuthorExistence={handleCheckAuthorExistence}
						openAuthorForm={() => setAuthorFormVisibility(true)}
						closeAuthorForm={() => setAuthorFormVisibility(false)}
						authorId={authorId}
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
						openIllustratorForm={() => setIllustratorFormVisibility(true)}
						closeIllustratorForm={() => setIllustratorFormVisibility(false)}
						illustratorId={illustratorId}
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
					openPublisherForm={() => setPublisherFormVisibility(true)}
					closePublisherForm={() => setPublisherFormVisibility(false)}
					publisherId={publisherId}
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
