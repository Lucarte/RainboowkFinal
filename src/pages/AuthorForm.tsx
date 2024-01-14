import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// import { SingleBookInfo } from "../types/SingleBookInfo";
import { useNavigate } from "react-router-dom";

const AuthorForm = () => {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			// Use the form data as needed, for example, send it to an API
			console.log("Form data:", data);
			// Return to book form, to see keep filling out the form
			navigate("/book/form");
		} catch (error) {
			console.error("Error submitting form:", error);
			// Handle error appropriately, e.g., show an error message to the user
		}
	};

	return (
		<>
			<form
				className='max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg'
				onSubmit={handleSubmit(handleFormSubmit)}>
				{/* Title Input */}
				<h1 className='pb-8 pl-2 font-semibold text-slate-500'>
					Author Information
				</h1>
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500 '
						htmlFor='first_name'>
						: first namE
					</label>
					<input
						{...register("first_name", { required: true })}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='first name'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='last_name'>
						last namE:
					</label>
					<input
						{...register("last_name", { required: true })}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='last name'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='date_of_birth'>
						date of birtH:
					</label>
					<input
						{...register("date_of_birth", { required: true })}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='date of birth'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='date_of_death'>
						date of deatH:
					</label>
					<input
						{...register("date_of_death", { required: true })}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='date of death'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='biography'>
						biographY:
					</label>
					<input
						{...register("biography", { required: true })}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='biography'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='nationality'>
						nationalitY
					</label>
					<input
						{...register("nationality", { required: true })}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='nationality'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='contact_email'>
						contact emaiL:
					</label>
					<input
						{...register("contact_email", { required: true })}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='contact email'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='website'>
						websitE:
					</label>
					<input
						{...register("website", { required: true })}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='website'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold tracking-wider text-right text-indigo-500'
						htmlFor='awards_and_honors'>
						awards and honorS:
					</label>
					<input
						{...register("awards_and_honors", { required: true })}
						className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-700'
						type='text'
						placeholder='awards and honors'
					/>
				</div>

				{/* Submit button */}
				<div className='mt-16 mb-4 text-right'>
					<button
						className='py-2 pl-8 pr-3 text-white bg-indigo-500 rounded-l-full hover:bg-indigo-700 focus:outline-none'
						type='submit'>
						<p className='flex flex-col gap-1 text-right'>add authoR</p>
					</button>
				</div>
			</form>
		</>
	);
};

export default AuthorForm;
