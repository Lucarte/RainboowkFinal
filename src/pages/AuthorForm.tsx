import { useEffect, useState } from "react";
import http from "../utils/http";
import { AuthorInfo } from "../types/AuthorInfo";

type AuthorFormProps = {
	onCloseForm: () => void;
	onAuthorAdded: (newAuthorId: number) => void;
	onAuthorDataChanged: AuthorInfo;
};

const AuthorForm: React.FC<AuthorFormProps> = ({
	onCloseForm,
	onAuthorAdded,
	onAuthorDataChanged,
}) => {
	const [authorData, setAuthorData] = useState<AuthorInfo>({
		id: 0,
		first_name: "",
		last_name: "",
		date_of_birth: "",
		date_of_death: "",
		biography: "",
		nationality: "",
		contact_email: "",
		website: "",
		awards_and_honors: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitting, setSubmitting] = useState(false);

	const [selectedAuthorId, setSelectedAuthorId] = useState(null);

	const saveAuthorData = async (
		data: AuthorInfo
	): Promise<number | { errorCode: string; errorMessage: string } | void> => {
		try {
			// Request CSRF token
			await http.get("/sanctum/csrf-cookie");

			// Make the author creation request
			const response = await http.post("/api/auth/create_author", data);

			// Obtain the new author ID from the response
			const newAuthorId = response.data.newAuthorId;

			// Call onAuthorAdded with the new author ID
			onAuthorAdded(newAuthorId);

			// Handle successful response
			console.log("Author created successfully:", response.data);

			// Return the new author ID
			return newAuthorId;
		} catch (error: any) {
			// Handle error
			console.error("Error submitting Author Form:", error);

			// Optionally, check the error response for more details
			if (error.response) {
				console.log("Error response data:", error.response.data);
			}

			// Return a detailed error object
			return {
				errorCode: "YOUR_ERROR_CODE",
				errorMessage: "A detailed error message",
			};
		}
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			console.log("submitting form...");
			setSubmitting(true);
			setErrors({}); // to clear previous errors

			// Validate the form data
			const validationErrors: Record<string, string> = {};

			// Add similar validations for other fields
			if (!authorData.first_name) {
				validationErrors.first_name = "First Name is required";
			}
			if (!authorData.last_name) {
				validationErrors.last_name = "Last Name is required";
			}

			// Check for the format and correctness of the email only if it's provided
			if (
				authorData.contact_email &&
				!isValidEmail(authorData.contact_email, "Contact Email")
			) {
				validationErrors.contact_email = "Invalid Contact Email";
			}

			// Check for the format of the date of birth only if it's provided
			if (
				authorData.date_of_birth &&
				!isValidDate(authorData.date_of_birth, "Date of Birth")
			) {
				validationErrors.date_of_birth = "Invalid Date of Birth";
			}

			// Check for the format of the date of death only if it's provided
			if (
				authorData.date_of_death &&
				!isValidDate(authorData.date_of_death, "Date of Death")
			) {
				validationErrors.date_of_death = "Invalid Date of Death";
			}

			if (Object.keys(validationErrors).length > 0) {
				setErrors(validationErrors);
				return;
			}

			// Call your API endpoint to save the author data
			const newAuthorId = await saveAuthorData(authorData);

			// Check the newAuthorId value and handle it appropriately
			if (typeof newAuthorId === "number") {
				// Handle the case where the author was successfully added
				alert("Author data successfully saved!");
				onCloseForm();
			} else {
				// Handle the case where there's an error during author creation
				console.error("An error occurred while submitting the form.");
			}
		} catch (error) {
			console.error("Error submitting Author Form:", error);
			// Handle other errors appropriately, e.g., show an error message to the user
			setErrors({
				submit:
					"An error occurred while submitting the form. Please try again.",
			});
		} finally {
			setSubmitting(false);
		}
	};

	// Validation functions
	const isValidDate = (value: string, fieldName: string): boolean => {
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateRegex.test(value)) {
			console.error(`${fieldName} should be in the format YYYY-MM-DD`);
			return false;
		}
		return true;
	};

	useEffect(() => {
		// Callback to notify the parent component (BookForm) about changes in authorData
		onAuthorDataChanged(authorData);
	}, [authorData, onAuthorDataChanged]);

	const isValidEmail = (value: string, fieldName: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			console.error(`${fieldName} should be a valid email address`);
			return false;
		}
		return true;
	};

	return (
		<>
			<div className='max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg'>
				{/* Title Input */}
				<h1 className='pb-8 pl-2 font-semibold text-slate-500'>
					Author Information
				</h1>
				{/* First Name Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500 '
						htmlFor='first_name'>
						First Name:
					</label>
					<input
						value={authorData.first_name}
						onChange={(e) =>
							setAuthorData({ ...authorData, first_name: e.target.value })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='First Name'
					/>
					{errors.first_name && (
						<p className='text-red-500'>{errors.first_name}</p>
					)}
				</div>
				{/* Last Name Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='last_name'>
						Last Name:
					</label>
					<input
						value={authorData.last_name}
						onChange={(e) =>
							setAuthorData({ ...authorData, last_name: e.target.value })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Last Name'
					/>
					{errors.last_name && (
						<p className='text-red-500'>{errors.last_name}</p>
					)}
				</div>
				{/* Date of Birth Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='date_of_birth'>
						Date of Birth (YYYY-MM-DD):
					</label>
					<input
						value={authorData.date_of_birth}
						onChange={(e) =>
							setAuthorData({ ...authorData, date_of_birth: e.target.value })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='YYYY-MM-DD'
					/>
					{errors.date_of_birth && (
						<p className='text-red-500'>{errors.date_of_birth}</p>
					)}
				</div>
				{/* Date of Death Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='date_of_death'>
						Date of Death (YYYY-MM-DD):
					</label>
					<input
						value={authorData.date_of_death}
						onChange={(e) =>
							setAuthorData({ ...authorData, date_of_death: e.target.value })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='YYYY-MM-DD'
					/>
					{errors.date_of_death && (
						<p className='text-red-500'>{errors.date_of_death}</p>
					)}
				</div>

				{/* Biography Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='biography'>
						Biography:
					</label>
					<input
						value={authorData.biography}
						onChange={(e) =>
							setAuthorData({ ...authorData, biography: e.target.value })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Biography'
					/>
					{errors.biography && (
						<p className='text-red-500'>{errors.biography}</p>
					)}
				</div>

				{/* Nationality Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='nationality'>
						Born in:
					</label>
					<input
						value={authorData.nationality}
						onChange={(e) =>
							setAuthorData({ ...authorData, nationality: e.target.value })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='(city), (state), country'
					/>
					{errors.nationality && (
						<p className='text-red-500'>{errors.nationality}</p>
					)}
				</div>

				{/* Contact Email Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='contact_email'>
						Contact Email:
					</label>
					<input
						value={authorData.contact_email}
						onChange={(e) =>
							setAuthorData({ ...authorData, contact_email: e.target.value })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Contact Email'
					/>
					{errors.contact_email && (
						<p className='text-red-500'>{errors.contact_email}</p>
					)}
				</div>

				{/* Website Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='website'>
						Website:
					</label>
					<input
						value={authorData.website}
						onChange={(e) =>
							setAuthorData({ ...authorData, website: e.target.value })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Website'
					/>
					{errors.website && <p className='text-red-500'>{errors.website}</p>}
				</div>

				{/* Awards and Honors Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='awards_and_honors'>
						Awards and Honors:
					</label>
					<input
						value={authorData.awards_and_honors}
						onChange={(e) =>
							setAuthorData({
								...authorData,
								awards_and_honors: e.target.value,
							})
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Awards and Honors'
					/>
					{errors.awards_and_honors && (
						<p className='text-red-500'>{errors.awards_and_honors}</p>
					)}
				</div>

				{/* Submit button */}
				<div className='mt-16 mb-4 text-right'>
					<button
						className='py-2 pl-8 pr-3 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
						onClick={handleFormSubmit}>
						<p className='flex flex-col gap-1 text-right'>Add Author</p>
					</button>
				</div>
			</div>
		</>
	);
};

export default AuthorForm;
