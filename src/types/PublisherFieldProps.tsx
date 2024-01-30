import { FieldErrors } from "react-hook-form";
import { SingleBookInfo } from "./SingleBookInfo";

export interface PublisherFieldProps {
	errors: FieldErrors<SingleBookInfo>;
	// openPublisherForm: () => void;
	// closePublisherForm: () => void;
	onClearMessage: () => void;
	setIsPublisherFormVisible: (isVisible: boolean) => void;
	setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
	publisherIndex: number;
	handleCheckPublisherExistence: (
		publisherIndex: number,
		formData: SingleBookInfo
	) => Promise<number | null>;
	publisherId: number | null;
	isPublisherFormVisible: null | boolean;
}
