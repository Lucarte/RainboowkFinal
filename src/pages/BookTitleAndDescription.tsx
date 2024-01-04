type Props = {
	title: string;
	description: string;
};

const BookTitleAndDescription = ({ title, description }: Props) => {
	return (
		<div className='flex flex-col gap-3 mt-10'>
			<div className='flex gap-2'>
				<h2 className='font-bold'>Title: </h2>
				<p>{title}</p>
			</div>
			<div className='flex flex-col gap-2'>
				<h2 className='font-bold'>Description: </h2>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default BookTitleAndDescription;
