import { useForm, useFieldArray, UseFormSetValue } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import { SingleBookInfo } from "../types/SingleBookInfo";
import { handleEntityExistence } from "../utils/handleEntityExistence";
import AuthorField from "./AuthorField";
import IllustratorField from "./IllustratorField";
import PublisherField from "./PublisherField";
import { PublisherInfo } from "../types/PublisherInfo";

const BookForm = () => {
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

	const handleCheckPublisher = async (exists: boolean) => {
		if (exists) {
			// Handle logic when publisher exists
			console.log("Publisher already exists!");
		} else {
			// Handle logic when publisher doesn't exist
			console.log("Publisher does not exist. You can add them.");
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
		setValue,
	} = form;

	const { fields: authorFields } = useFieldArray({
		control,
		name: "authors",
	});

	const { fields: illustratorFields } = useFieldArray({
		control,
		name: "illustrators",
	});

	const { fields: publisherFields } = form;

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

	const handleCheckPublisherExistence = async (
		// form: SingleBookInfo,
		// setValue: UseFormSetValue<SingleBookInfo>,
		publisherIndex: number
	) => {
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

		// Optionally, set the publisher name in the form state // does not yet work
		// if (exists) {
		// 	setValue(`publisher.${publisherIndex}.name`, exists.name);
		// }

		return exists;
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
					type='submit'>
					Add Book
				</button>
			</div>
		</form>
	);
};

export default BookForm;
