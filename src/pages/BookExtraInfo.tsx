import AuthorBtn from "./AuthorBtn";
import IllustratorBtn from "./IllustratorBtn";
import Publisher from "./Publisher";
import OriginalLanguage from "./OriginalLanguage";
import PrintDate from "./PrintDate";
import ISBNNumber from "./ISBNNumber";

type Props = {
	author: string;
	illustrator: string;
	publisher: {
		oName: string;
		website?: string;
		year?: number;
	};
	original_language: string;
	print_date: string;
	ISBN: string;
};

const BookExtraInfo = ({
	author,
	illustrator,
	publisher,
	original_language,
	print_date,
	ISBN,
}: Props) => {
	// if (!publisher.website) {
	// 	publisher.website = "default";
	// }
	// if (!publisher.year) {
	// 	publisher.year = 0;
	// }

	return (
		<div>
			<div className='flex flex-col gap-4'>
				<AuthorBtn author={author} />
				<IllustratorBtn illustrator={illustrator} />
				<Publisher
					oName={publisher.oName}
					website={publisher.website}
					year={publisher.year}
				/>
				<OriginalLanguage oLan={original_language} />
				<PrintDate date={print_date} />
				<ISBNNumber isbn={ISBN} />
			</div>
		</div>
	);
};

export default BookExtraInfo;
