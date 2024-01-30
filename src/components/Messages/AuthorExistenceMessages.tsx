interface AuthorExistenceMessagesProps {
	formSubmitted: boolean | null;
	authorId: number | null;
	onClearMessage: () => void;
}

export const AuthorExistenceMessages: React.FC<
	AuthorExistenceMessagesProps
> = ({ formSubmitted, authorId }) => {
	if (!formSubmitted) {
		return null; // Do not render anything if formSubmitted is null
	}

	return (
		<div className='mt-2 text-sm text-right text-cyan-500'>
			{authorId ? (
				<p className='text-slate-500'>
					Great! Author exists already, and you need not enter their details!
				</p>
			) : (
				<p>No matches found. Go ahead and add one.</p>
			)}
		</div>
	);
};

// interface AuthorExistenceMessagesProps {
// 	formSubmitted: boolean | null;
// 	authorId: number | null;
// 	isAuthorFormVisible: boolean | null;
// }

// export const AuthorExistenceMessages: React.FC<
// 	AuthorExistenceMessagesProps
// > = ({ formSubmitted, authorId, isAuthorFormVisible }) => {
// 	if (!formSubmitted) {
// 		return null; // Do not render anything if formSubmitted is null
// 	}
// 	console.log("Rendering AuthorExistenceMessages:", {
// 		formSubmitted,
// 		authorId,
// 		isAuthorFormVisible,
// 	});

// 	if (!authorId) {
// 		return (
// 			<div className='mt-2 text-sm text-right text-cyan-500'>
// 				No matches found. Go ahead and add one.
// 			</div>
// 		);
// 	}

// 	if (authorId) {
// 		return (
// 			<p className='mt-2 text-sm text-right text-slate-500'>
// 				Great! Author exists already, and you need not enter their details!
// 			</p>
// 		);
// 	}

// 	return null; // Default case, return null
// };
