interface IllustratorExistenceMessagesProps {
	formSubmitted: boolean | null;
	illustratorId: number | null;
	onClearMessage: () => void;
}

export const IllustratorExistenceMessages: React.FC<
	IllustratorExistenceMessagesProps
> = ({ formSubmitted, illustratorId }) => {
	if (!formSubmitted) {
		return null; // Do not render anything if formSubmitted is null
	}

	return (
		<div className='mt-2 text-sm text-right text-cyan-500'>
			{illustratorId ? (
				<p className='text-slate-500'>
					Great! Illustrator exists already, and you need not enter their
					details!
				</p>
			) : (
				<p>No matches found. Go ahead and add one.</p>
			)}
		</div>
	);
};
