import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SingleBookInfo } from "../types/SingleBookInfo";
import AuthorForm from "./AuthorForm";

interface AuthorFieldProps {
	register: UseFormRegister<SingleBookInfo>;
	errors: FieldErrors<SingleBookInfo>;
	authorIndex: number;
	getValues: (name?: string | string[]) => SingleBookInfo;
	handleCheckAuthorExistence: (
		authorIndex: number,
		formData: SingleBookInfo
	) => Promise<number | null>;
	openAuthorForm: () => void;
	closeAuthorForm: () => void;
	authorId: number | null;
	isAuthorFormVisible: boolean;
}

const AuthorField: React.FC<AuthorFieldProps> = ({
	register,
	errors,
	authorIndex,
	getValues,
	handleCheckAuthorExistence,
	openAuthorForm,
	closeAuthorForm,
	authorId,
	isAuthorFormVisible,
}) => {
	// Define formData state
	const [formData, setFormData] = useState<SingleBookInfo>({});
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
				onClick={async () => {
					const exists = await handleCheckAuthorExistence(
						authorIndex,
						formData
					);

					setFormChecked(true); // Set the flag after form check

					if (exists !== null) {
						console.log(`No matches found. Go ahead and add one.`);
						// Open the form when the author doesn't exist
						openAuthorForm();
					} else {
						console.log(`Great! Author exists already.`);
					}
				}}>
				Check Author
			</button>

			{(!authorId || isAuthorFormVisible) && (
				<div className='mt-2 text-sm text-right text-cyan-500'>
					No matches found. Go ahead and add one.
				</div>
			)}

			{authorId && !isAuthorFormVisible && (
				<p className='mt-2 text-sm text-right text-slate-500'>
					Great! Author exists already, and you need not enter their details!
				</p>
			)}

			{isAuthorFormVisible && <AuthorForm onCloseForm={closeAuthorForm} />}
		</div>
	);
};

export default AuthorField;
