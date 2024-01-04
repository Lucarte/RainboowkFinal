type Props = {
	author: string;
};

const AuthorBtn = ({ author }: Props) => {
	return (
		<div>
			<div className='flex gap-3'>
				<p className='font-bold text-md'>Author:</p>
				<button className='py-1 bg-cyan-100'>
					<p className='text-md'>{author}</p>
				</button>
			</div>
		</div>
	);
};

export default AuthorBtn;
