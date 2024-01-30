interface PublisherExistenceMessagesProps {
	formSubmitted: boolean | null;
	publisherId: number | null;
	onClearMessage: () => void;
}

export const PublisherExistenceMessages: React.FC<
	PublisherExistenceMessagesProps
> = ({ formSubmitted, publisherId }) => {
	if (!formSubmitted) {
		return null; // Do not render anything if formSubmitted is null
	}

	return (
		<div className='mt-2 text-sm text-right text-cyan-500'>
			{publisherId ? (
				<p className='text-slate-500'>
					Great! Publisher exists already, and you need not enter their details!
				</p>
			) : (
				<p>No matches found. Go ahead and add one.</p>
			)}
		</div>
	);
};
