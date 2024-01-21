import { useState } from "react";
import { useForm } from "react-hook-form";
import http from "../utils/http";
import { IllustratorInfo } from "../types/IllustratorInfo";

type Props = {
	onCloseForm: () => void;
};

const IllustratorForm = ({ onCloseForm }: Props) => {
	const [illustratorData, setIllustratorData] = useState<IllustratorInfo>({
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

	const saveIllustratorData = async (data: IllustratorInfo) => {
		try {
			const response = await http.post("/api/auth/create_illustrator", data);
			console.log("Illustrator data saved:", response.data);
		} catch (error) {
			console.error("Error submitting Illustrator Form:", error);
			setErrors({
				submit:
					"An error occurred while saving the illustrator. Please try again.",
			});
		} finally {
			setSubmitting(false);
		}
	};

	const handleFormSubmit = async () => {
		try {
			console.log("submitting form...");
			setSubmitting(true);
			setErrors({}); // to clear previous errors

			// Validate the form data
			const validationErrors: Record<string, string> = {};

			// Add similar validations for other fields
			if (!illustratorData.first_name) {
				validationErrors.first_name = "First Name is required";
			}
			if (!illustratorData.last_name) {
				validationErrors.last_name = "Last Name is required";
			}

			// Check for the format and correctness of the email only if it's provided
			if (
				illustratorData.contact_email &&
				!isValidEmail(illustratorData.contact_email, "Contact Email")
			) {
				validationErrors.contact_email = "Invalid Contact Email";
			}

			// Check for the format of the date of birth only if it's provided
			if (
				illustratorData.date_of_birth &&
				!isValidDate(illustratorData.date_of_birth, "Date of Birth")
			) {
				validationErrors.date_of_birth = "Invalid Date of Birth";
			}

			// Check for the format of the date of death only if it's provided
			if (
				illustratorData.date_of_death &&
				!isValidDate(illustratorData.date_of_death, "Date of Death")
			) {
				validationErrors.date_of_death = "Invalid Date of Death";
			}

			if (Object.keys(validationErrors).length > 0) {
				setErrors(validationErrors);
				return;
			}

			// Call your API endpoint to save the illustrator data
			await saveIllustratorData(illustratorData);

			// Close the IllustratorForm after saving the illustrator data
			onCloseForm();
		} catch (error) {
			console.error("Error submitting Illustrator Form:", error);
			// Handle error appropriately, e.g., show an error message to the user
			setErrors({
				submit:
					"An error occurred while submitting the form. Please try again.",
			});
		} finally {
			setSubmitting(false);
		}
	};

	// Validation functions remain the same

	return (
		<div className='max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg'>
			{/* Title Input */}
			<h1 className='pb-8 pl-2 font-semibold text-slate-500'>
				Illustrator Information
			</h1>
			{/* Rest of your form UI remains the same */}

			{/* Submit button */}
			<div className='mt-16 mb-4 text-right'>
				<button
					className='py-2 pl-8 pr-3 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
					onClick={handleFormSubmit}>
					<p className='flex flex-col gap-1 text-right'>Add Illustrator</p>
				</button>
			</div>
		</div>
	);
};

export default IllustratorForm;
