// AuthorField.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { SingleBookInfo } from "../types/SingleBookInfo";
import AuthorForm from "./AuthorForm";

interface AuthorFieldProps {
	register: UseFormRegister<SingleBookInfo>;
	errors: any; // Adjust this type based on your actual error structure
	authorIndex: number;
	handleCheckAuthorExistence: (authorIndex: number) => Promise<boolean>;
	openAuthorForm: () => void;
	closeAuthorForm: () => void;
	authorCheck: boolean;
	isAuthorFormVisible: boolean;
}

const AuthorField: React.FC<AuthorFieldProps> = ({
	register,
	errors,
	authorIndex,
	handleCheckAuthorExistence,
	openAuthorForm,
	closeAuthorForm,
	authorCheck,
	isAuthorFormVisible,
}) => {
	return (
		<div key={authorIndex} className='flex flex-col gap-4'>
			{/* ... (existing code for First Name and Last Name inputs) ... */}
			<div className='flex flex-col'>
				<div className='flex flex-col'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor={`authors[${authorIndex}].first_name`}>
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
					const exists = await handleCheckAuthorExistence(authorIndex);

					if (exists) {
						console.log(`Great! Author exists already.`);
					} else {
						console.log(`No matches found. Go ahead and add one.`);
						openAuthorForm();
					}
				}}>
				Check Author
			</button>

			{!authorCheck && isAuthorFormVisible && (
				<div className='mt-2 text-sm text-right text-cyan-500'>
					No matches found. Go ahead and add one.
				</div>
			)}

			{authorCheck && !isAuthorFormVisible && (
				<p className='mt-2 text-sm text-right text-slate-500'>
					Great! Author exists already and you need not enter his details!
				</p>
			)}

			{isAuthorFormVisible && <AuthorForm onCloseForm={closeAuthorForm} />}
		</div>
	);
};

export default AuthorField;
