// IllustratorField.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { SingleBookInfo } from "../types/SingleBookInfo";
import IllustratorForm from "./IllustratorForm";

interface IllustratorFieldProps {
	register: UseFormRegister<SingleBookInfo>;
	errors: any; // Adjust this type based on your actual error structure
	illustratorIndex: number;
	handleCheckIllustratorExistence: (
		illustratorIndex: number
	) => Promise<boolean>;
	openIllustratorForm: () => void;
	closeIllustratorForm: () => void;
	illustratorCheck: boolean;
	isIllustratorFormVisible: boolean;
}

const IllustratorField: React.FC<IllustratorFieldProps> = ({
	register,
	errors,
	illustratorIndex,
	handleCheckIllustratorExistence,
	openIllustratorForm,
	closeIllustratorForm,
	illustratorCheck,
	isIllustratorFormVisible,
}) => {
	return (
		<div key={illustratorIndex} className='flex flex-col gap-4'>
			{/* ... (existing code for First Name and Last Name inputs) ... */}
			<div className='flex flex-col'>
				<div className='flex flex-col'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor={`illustrators.${illustratorIndex}.first_name`}>
						First Name:
					</label>
					<input
						{...register(`illustrators.${illustratorIndex}.first_name`, {
							required: "First name is required",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='First Name'
					/>
					{errors.illustrators?.[illustratorIndex]?.first_name && (
						<p className='mt-2 text-sm text-right text-cyan-500'>
							{errors.illustrators?.[illustratorIndex]?.first_name?.message}
						</p>
					)}
				</div>
				<div>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor={`illustrators.${illustratorIndex}.last_name`}>
						Last Name:
					</label>
					<input
						{...register(`illustrators.${illustratorIndex}.last_name`, {
							required: "Last name is required",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Last Name'
					/>
					{errors.illustrators?.[illustratorIndex]?.last_name && (
						<p className='mt-2 text-sm text-right text-cyan-500'>
							{errors.illustrators?.[illustratorIndex]?.last_name?.message}
						</p>
					)}
				</div>
			</div>
			<button
				className='text-indigo-500 bg-white border-2 border-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
				type='button'
				onClick={async () => {
					const exists = await handleCheckIllustratorExistence(
						illustratorIndex
					);

					if (exists) {
						console.log(`Great! Illustrator exists already.`);
					} else {
						console.log(`No matches found. Go ahead and add one.`);
						openIllustratorForm();
					}
				}}>
				Check Illustrator
			</button>

			{!illustratorCheck && isIllustratorFormVisible && (
				<div className='mt-2 text-sm text-right text-cyan-500'>
					No matches found. Go ahead and add one.
				</div>
			)}

			{illustratorCheck && !isIllustratorFormVisible && (
				<p className='mt-2 text-sm text-right text-slate-500'>
					Great! Illustrator exists already, and you need not enter their
					details!
				</p>
			)}

			{isIllustratorFormVisible && (
				<IllustratorForm onCloseForm={closeIllustratorForm} />
			)}
		</div>
	);
};

export default IllustratorField;
