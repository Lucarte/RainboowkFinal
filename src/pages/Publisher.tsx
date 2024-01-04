type Props = {
	oName: string;
	website?: string;
	year?: number;
};

const Publisher = ({ oName, website, year }: Props) => {
	return (
		<div className='flex gap-3'>
			<h2 className='font-bold'>Publisher:</h2>
			<div className='flex flex-col gap-1'>
				<h2 className='text-lg'>{oName}</h2>
				<p>{website}</p>
				<p>{year}</p>
			</div>
		</div>
	);
};

export default Publisher;
