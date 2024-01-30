import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SingleBookInfo } from "../types/SingleBookInfo";
import AuthorForm from "./AuthorForm";
import { AuthorExistenceMessages } from "../components/Messages/AuthorExistenceMessages";
import { AuthorFieldProps } from "../types/AuthorFieldProps";

const AuthorField: React.FC<AuthorFieldProps> = ({
	handleCheckAuthorExistence,
	authorIndex,
	authorId,
	errors,
	onClearMessage,
}) => {
	const { register, getValues } = useForm<SingleBookInfo>();
	const [formSubmitted, setFormSubmitted] = useState<null | boolean>(null);
	const [isAuthorFormVisible, setIsAuthorFormVisible] = useState<
		null | boolean
	>(null);
	const [authorMessage, setAuthorMessage] = useState<string | null>(null);

	const handleButtonClick = async () => {
		const formData = getValues();
		const exists = await handleCheckAuthorExistence(authorIndex, formData);

		if (exists) {
			console.log(`Great! Author exists already.`);
			onClearMessage(); // Clear the message when showing the form
		} else {
			console.log(`No matches found. Go ahead and add one.`);
			onClearMessage(); // Clear the message when showing the form
			setIsAuthorFormVisible(true);
		}

		setFormSubmitted(true);
	};

	// Close the AuthorForm && clear message
	const closeAuthorForm = () => {
		setAuthorMessage(null);
		setIsAuthorFormVisible(false);
	};
	return (
		<div key={authorIndex} className='flex flex-col gap-4'>
			{/* ... (First Name and Last Name inputs) ... */}
			<div className='flex flex-col'>
				<div className='flex flex-col'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor={`authors.${authorIndex}.first_name`}>
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
			</div>

			<button
				className='text-indigo-500 bg-white border-2 border-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
				type='button'
				onClick={handleButtonClick}>
				Check Author
			</button>

			{/* Extracted component for author existence messages */}
			<AuthorExistenceMessages
				formSubmitted={formSubmitted}
				authorId={authorId}
				onClearMessage={onClearMessage}
			/>

			{isAuthorFormVisible && (
				<AuthorForm onCloseForm={closeAuthorForm} />
				// <AuthorForm onCloseForm={() => setIsAuthorFormVisible(false)} />
			)}
		</div>
	);
};

export default AuthorField;
