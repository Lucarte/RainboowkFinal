// import { useHistory } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { PublisherInfo, SingleBookInfo } from "../types/SingleBookInfo";
import AuthorField from "./AuthorField";
import IllustratorField from "./IllustratorField";
import PublisherField from "./PublisherField";
import http from "../utils/http";
import { AuthorExistenceMessages } from "../components/Messages/AuthorExistenceMessages";
import { IllustratorExistenceMessages } from "../components/Messages/IllustratorExistenceMessages";
import { AuthorInfo } from "../types/SingleBookInfo";
import AuthorForm from "./AuthorForm";

const BookForm = () => {
	const { user } = useContext(AuthContext);

	// State variables and their corresponding set functions
	const [isAuthorFormVisible, setIsAuthorFormVisible] =
		useState<boolean>(false);
	const [isIllustratorFormVisible, setIsIllustratorFormVisible] =
		useState<boolean>(false);
	const [isPublisherFormVisible, setIsPublisherFormVisible] =
		useState<boolean>(false);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [authorId, setAuthorId] = useState<number | null>(null);
	const [illustratorId, setIllustratorId] = useState<number | null>(null);
	const [publisherId, setPublisherId] = useState<number | null>(null);

	// Attempt to get rid of the 'no matches...' message after closing AuthorForm
	const [authorMessage, setAuthorMessage] = useState<string | null>(null);
	const handleClearMessage = () => {
		setAuthorMessage(null);
	};

	const [isAuthorFormOpen, setIsAuthorFormOpen] = useState(false);

	const handleAddNewAuthorClick = async () => {
		// Toggle the state to open/close the AuthorForm
		setIsAuthorFormOpen((prevIsOpen) => !prevIsOpen);

		// Fetch the updated list of authors after adding a new author
		await fetchData();
	};

	// Initialize state to keep track of author IDs
	const [previousAuthorIds, setPreviousAuthorIds] = useState<number[]>([]);
	const [existingAuthors, setExistingAuthors] = useState<AuthorInfo[]>([]);

	const fetchData = async () => {
		try {
			const apiResponse = await http.get("/api/authors");

			if (Array.isArray(apiResponse.data.Authors)) {
				// Extract author IDs and update the state
				const authorIds = apiResponse.data.Authors.map(
					(author: AuthorInfo) => author.id
				);
				setPreviousAuthorIds(authorIds);

				// Update the state with the array of authors directly
				setExistingAuthors(apiResponse.data.Authors);
			} else {
				console.error("Invalid data format:", apiResponse.data);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const [authorData, setAuthorData] = useState<AuthorInfo>({
		first_name: "",
		last_name: "",
	});

	// This is just an example, you should replace it with your actual API endpoint or data fetching logic
	const fetchAuthorDetails = async (slug: string) => {
		try {
			const response = await http.get(`/api/author/${slug}`);
			return response.data; // Assuming the response contains the author details
		} catch (error) {
			throw error; // Handle the error as needed
		}
	};

	// In your BookForm or wherever you need to fetch author details
	const handleAuthorAdded = async (newAuthorId: number) => {
		try {
			// Assuming your AuthorInfo object has properties first_name and last_name
			const newAuthorSlug = `${authorData.first_name}_${authorData.last_name}`;

			// Fetch the details of the newly added author
			const authorDetails = await fetchAuthorDetails(newAuthorSlug);

			// Now you can use the authorDetails in your code
			console.log("Author details:", authorDetails);

			setSelectedAuthorId(newAuthorId);
		} catch (error) {
			console.error("Error fetching author details:", error);
			// Handle the error as needed
		}
	};

	// Call the fetchData function to fetch data when the component mounts
	useEffect(() => {
		fetchData();
	}, []); // The empty dependency array ensures that it only runs once when the component mounts

	// Instance of useForm
	const form = useForm<SingleBookInfo>({
		defaultValues: {
			ISBN: "",
			title: "",
			description: "",
			print_date: "",
			original_language: "",
			author_id: 0,
			illustrator_id: 0,
			publisher_id: 0,
			image_path: undefined,
		},
	});

	// Form structure
	const {
		register,
		control,
		getValues,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = form;

	// Authors FieldArray fn
	const { fields: authorFields } = useFieldArray({
		control,
		name: "authors",
	});

	// Illustrators FieldArray fn
	const { fields: illustratorFields } = useFieldArray({
		control,
		name: "illustrators",
	});

	// Authors Existence Check
	const handleCheckAuthorExistence = async (
		authorIndex: number,
		formData: SingleBookInfo
	) => {
		try {
			// Make the existence check request for authors
			console.log(form.authors);
			form.authors = formData.authors;
			const response = await http.get(
				`/api/auth/author_existence_check?first_name=${formData.authors[authorIndex].first_name}&last_name=${formData.authors[authorIndex].last_name}&index=${authorIndex}`
			);

			// Assuming the response contains necessary information, extract data
			const { exists, authorId } = response.data;

			if (exists) {
				console.log(`Author exists with id: ${authorId}`);
				setAuthorId(authorId);
				return authorId; // Update authorId in the state
			} else {
				console.log(`No author found`);
				setAuthorId(null); // Reset authorId when not found
			}
		} catch (error) {
			console.error(`Error checking author existence:`, error);
			// Handle errors as needed
			throw error; // Ensure the error is propagated
		}
	};

	// Illustrators Existence Check
	const handleCheckIllustratorExistence = async (
		illustratorIndex: number,
		formData: SingleBookInfo
	) => {
		try {
			// Make the existence check request for authors
			console.log(formData.illustrators);
			const response = await http.get(
				`/api/auth/illustrator_existence_check?first_name=${formData.illustrators[illustratorIndex].first_name}&last_name=${formData.illustrators[illustratorIndex].last_name}&index=${illustratorIndex}`
			);

			// Assuming the response contains necessary information, extract data
			const { exists, illustratorId } = response.data;

			if (exists) {
				console.log(`Illustrator exists with id: ${illustratorId}`);
				setIllustratorId(illustratorId);
				return illustratorId; // Return the authorId when found
			} else {
				console.log(`No illustrator found`);
				setIllustratorId(null); // Return null when not found
			}
		} catch (error) {
			console.error(`Error checking illustrator existence:`, error);
			// Handle errors as needed
			throw error; // Ensure the error is propagated
		}
	};

	// Publisher Existence Check
	const handleCheckPublisherExistence = async (
		publisherIndex: number,
		formData: SingleBookInfo
	) => {
		try {
			// Make the existence check request for publishers
			const response = await http.get(
				`/api/auth/publisher_existence_check?name=${formData.publisher[publisherIndex].name}&index=${publisherIndex}`
			);

			// Assuming the response contains necessary information, extract data
			const { exists, publisherId } = response.data;

			if (exists) {
				console.log(`Publisher exists with id: ${publisherId}`);
				setPublisherId(publisherId);
				// You can handle the existence of the publisher here
				return publisherId; // Return the publisherId when found
			} else {
				console.log(`No publisher found`);
				// You can handle the case when no publisher is found
				return null; // Return null when not found
			}
		} catch (error) {
			console.error(`Error checking publisher existence:`, error);
			// Handle errors as needed
			throw error; // Ensure the error is propagated
		}
	};

	// Book Form Submission Logik
	const submitBook = async (formData: SingleBookInfo, authorId: number) => {
		const userId = user?.id;

		// console.log("User ID:", userId);
		// console.log("Book Data:", formData);
		// console.log("Author ID:", authorId);
		// console.log("Values:", getValues());
		// console.log("Form:", form);

		try {
			await http.get("/sanctum/csrf-cookie");

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

	const [selectedAuthorId, setSelectedAuthorId] = useState<number | null>(null);

	// JSX RETURN
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
			<div className='mb-4'>
				<label
					className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
					htmlFor='author_id'>
					Author:
				</label>
				<div className='relative'>
					<select
						{...register("author_id", {
							required: "Please select an author",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						aria-invalid={errors.author_id ? "true" : "false"}
						value={selectedAuthorId ?? ""}
						onChange={(e) => setSelectedAuthorId(Number(e.target.value))}

						// onChange={handleAuthorSelection}
					>
						<option value='' disabled>
							Select an author
						</option>
						{existingAuthors.map((author) => (
							<option key={author.id} value={author.id}>
								{author.fullname}
							</option>
						))}
					</select>

					<button
						type='button'
						className='absolute top-0 right-0 px-2 py-3 text-white bg-indigo-300 rounded-r-lg'
						onClick={handleAddNewAuthorClick}>
						Add New
					</button>
				</div>

				{/* Render AuthorForm conditionally based on the state */}
				{isAuthorFormOpen && (
					<AuthorForm
						onCloseForm={() => setIsAuthorFormOpen(false)}
						onAuthorAdded={handleAuthorAdded}
					/>
				)}

				<p className='mt-2 text-sm text-right text-cyan-500'>
					{errors.author_id?.message}
				</p>
			</div>

			{/* Illustrator Input */}
			<div className='mb-4 bg-slate-300'>
				<label
					className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
					htmlFor='illustrator'>
					Illustrator:
				</label>
				{illustratorFields.map((field, illustratorIndex) => (
					<div key={illustratorIndex}>
						<IllustratorField
							errors={errors}
							setIsIllustratorFormVisible={setIsIllustratorFormVisible}
							illustratorIndex={illustratorIndex}
							handleCheckIllustratorExistence={handleCheckIllustratorExistence}
							illustratorId={illustratorId}
							closeIllustratorForm={() => setIsIllustratorFormVisible(false)}
							openIllustratorForm={() => setIsIllustratorFormVisible(true)}
							isIllustratorFormVisible={isIllustratorFormVisible}
							setFormSubmitted={setFormSubmitted}
						/>
						<IllustratorExistenceMessages
							formSubmitted={formSubmitted}
							illustratorId={illustratorId}
							isIllustratorFormVisible={isIllustratorFormVisible}
						/>
					</div>
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
					errors={errors}
					setIsPublisherFormVisible={isPublisherFormVisible}
					publisherIndex={0}
					handleCheckPublisherExistence={handleCheckPublisherExistence}
					publisherId={publisherId}
					closePublisherForm={() => setIsPublisherFormVisible(false)}
					openPublisherForm={() => setIsPublisherFormVisible(true)}
					isPublisherFormVisible={isPublisherFormVisible}
					setFormSubmitted={setFormSubmitted}
				/>
				<IllustratorExistenceMessages
					formSubmitted={formSubmitted}
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
