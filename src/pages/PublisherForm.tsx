import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import http from "../utils/http";
import { PublisherInfo } from "../types/PublisherInfo";

type PublisherFormProps = {
	onCloseForm: () => void;
};

const PublisherForm: React.FC<PublisherFormProps> = ({ onCloseForm }) => {
	const [publisherData, setPublisherData] = useState<PublisherInfo>({
		name: "",
		description: "",
		website: "",
		foundation_year: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitting, setSubmitting] = useState(false);

	const savePublisherData = async (data: PublisherInfo) => {
		try {
			// Request CSRF token
			await http.get("/sanctum/csrf-cookie");

			// Make the publisher creation request
			const response = await http.post("/api/auth/create_publisher", data);

			// Handle successful response
			console.log("Publisher created successfully:", response.data);
		} catch (error: any) {
			// Handle error
			console.error("Error submitting Publisher Form:", error);

			// Optionally, check the error response for more details
			if (error.response) {
				console.log("Error response data:", error.response.data);
			}
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
			if (!publisherData.name) {
				validationErrors.name = "Name is required";
			}

			if (Object.keys(validationErrors).length > 0) {
				setErrors(validationErrors);
				return;
			}

			// Call your API endpoint to save the publisher data
			await savePublisherData(publisherData);
			alert("Publisher data successfully saved!");
			onCloseForm();
		} catch (error) {
			console.error("Error submitting Publisher Form:", error);
			// Handle error appropriately, e.g., show an error message to the user
			setErrors({
				submit:
					"An error occurred while submitting the form. Please try again.",
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<>
			<div className='max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg'>
				{/* Title Input */}
				<h1 className='pb-8 pl-2 font-semibold text-slate-500'>
					Publisher Information
				</h1>

				{/* Name Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500 '
						htmlFor='name'>
						Name:
					</label>
					<input
						value={publisherData.name}
						onChange={(e) =>
							setPublisherData({ ...publisherData, name: e.target.value })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Name'
					/>
					{errors.name && <p className='text-red-500'>{errors.name}</p>}
				</div>

				{/* Description Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='description'>
						Description:
					</label>
					<input
						value={publisherData.description}
						onChange={(e) =>
							setPublisherData({
								...publisherData,
								description: e.target.value,
							})
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Description'
					/>
					{errors.description && (
						<p className='text-red-500'>{errors.description}</p>
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
						value={publisherData.website}
						onChange={(e) =>
							setPublisherData({ ...publisherData, website: e.target.value })
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Website'
					/>
					{errors.website && <p className='text-red-500'>{errors.website}</p>}
				</div>

				{/* Foundation Year Input */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='foundation_year'>
						Foundation Year:
					</label>
					<input
						value={publisherData.foundation_year}
						onChange={(e) =>
							setPublisherData({
								...publisherData,
								foundation_year: e.target.value,
							})
						}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Foundation Year'
					/>
					{errors.foundation_year && (
						<p className='text-red-500'>{errors.foundation_year}</p>
					)}
				</div>

				{/* Submit button */}
				<div className='mt-16 mb-4 text-right'>
					<button
						className='py-2 pl-8 pr-3 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
						onClick={handleFormSubmit}>
						<p className='flex flex-col gap-1 text-right'>Add Publisher</p>
					</button>
				</div>
			</div>
		</>
	);
};

export default PublisherForm;
