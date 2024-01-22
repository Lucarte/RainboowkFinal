import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import PublisherForm from "./PublisherForm"; // Assuming you have a PublisherForm component
import { PublisherInfo } from "../types/PublisherInfo";
import { SingleBookInfo } from "../types/SingleBookInfo";

interface PublisherFieldProps {
	register: UseFormRegister<SingleBookInfo>;
	errors: any; // Adjust this type based on your actual error structure
	publisherIndex: number;
	handleCheckPublisherExistence: (publisherIndex: number) => Promise<boolean>;
	openPublisherForm: () => void;
	closePublisherForm: () => void;
	publisherCheck: boolean;
	isPublisherFormVisible: boolean;
}

const PublisherField: React.FC<PublisherFieldProps> = ({
	register,
	errors,
	publisherIndex,
	handleCheckPublisherExistence,
	openPublisherForm,
	closePublisherForm,
	publisherCheck,
	isPublisherFormVisible,
}) => {
	return (
		<div key={publisherIndex} className='flex flex-col gap-4'>
			<div className='flex flex-col'>
				<div className='flex flex-col'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor={`publisher[${publisherIndex}].name`}>
						Publisher Name:
					</label>
					<input
						{...register(`publisher.${publisherIndex}.name` as any, {
							required: "Publisher name is required",
						})}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='Publisher Name'
					/>
					{errors.publisher?.[publisherIndex]?.name && (
						<p className='mt-2 text-sm text-right text-cyan-500'>
							{errors.publisher?.[publisherIndex]?.name?.message}
						</p>
					)}
				</div>
			</div>

			<button
				className='text-indigo-500 bg-white border-2 border-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
				type='button'
				onClick={async () => {
					const exists = await handleCheckPublisherExistence(publisherIndex);

					if (exists) {
						console.log(`Great! Publisher exists already.`);
					} else {
						console.log(`No matches found. Go ahead and add one.`);
						openPublisherForm();
					}
				}}>
				Check Publisher
			</button>

			{!publisherCheck && isPublisherFormVisible && (
				<div className='mt-2 text-sm text-right text-cyan-500'>
					No matches found. Go ahead and add one.
				</div>
			)}

			{publisherCheck && !isPublisherFormVisible && (
				<p className='mt-2 text-sm text-right text-slate-500'>
					Great! Publisher exists already, and you need not enter their details!
				</p>
			)}

			{isPublisherFormVisible && (
				<PublisherForm onCloseForm={closePublisherForm} />
			)}
		</div>
	);
};

export default PublisherField;
