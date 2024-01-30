import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SingleBookInfo } from "../types/SingleBookInfo";
import IllustratorForm from "./IllustratorForm";
import { IllustratorFieldProps } from "../types/IllustratorFieldProps";
import { IllustratorExistenceMessages } from "../components/Messages/IllustratorExistenceMessages";

const IllustratorField: React.FC<IllustratorFieldProps> = ({
	handleCheckIllustratorExistence,
	illustratorIndex,
	illustratorId,
	errors,
}) => {
	const { register, getValues } = useForm<SingleBookInfo>();
	const [formSubmitted, setFormSubmitted] = useState<null | boolean>(null);
	const [isIllustratorFormVisible, setIsIllustratorFormVisible] = useState<
		null | boolean
	>(null);
	const openIllustratorForm = () => {
		console.log("Opening illustrator form");
		setIsIllustratorFormVisible(true);
	};

	const closeIllustratorForm = () => {
		setIsIllustratorFormVisible(false);
	};

	const handleButtonClick = async () => {
		const formData = getValues();
		const exists = await handleCheckIllustratorExistence(
			illustratorIndex,
			formData
		);

		console.log("exists:", exists);
		console.log("isIllustratorFormVisible:", isIllustratorFormVisible);

		if (exists) {
			console.log(`Great! Illustrator exists already.`);
			closeIllustratorForm();
		} else {
			console.log(`No matches found. Go ahead and add one.`);
			openIllustratorForm();
		}

		setFormSubmitted(true);
	};
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
				onClick={handleButtonClick}>
				Check Illustrator
			</button>

			{/* Extracted component for Illustrator existence messages */}
			<IllustratorExistenceMessages
				formSubmitted={formSubmitted}
				illustratorId={illustratorId}
				isIllustratorFormVisible={isIllustratorFormVisible}
			/>

			{isIllustratorFormVisible && (
				<IllustratorForm onCloseForm={closeIllustratorForm} />
			)}
		</div>
	);
};

export default IllustratorField;
