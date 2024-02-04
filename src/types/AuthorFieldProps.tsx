import { FieldErrors } from "react-hook-form";
import { SingleBookInfo } from "./SingleBookInfo";

export interface AuthorFieldProps {
	formData?: SingleBookInfo;
	errors: FieldErrors<SingleBookInfo>;
	// openAuthorForm: () => void;
	// closeAuthorForm: () => void;
	onClearMessage: () => void;
	setIsAuthorFormVisible: (isVisible: boolean) => void;
	setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
	authorIndex: number;
	handleCheckAuthorExistence: (
		authorIndex: number,
		formData: SingleBookInfo
	) => Promise<number | null>;
	authorId: number | null;
	isAuthorFormVisible: null | boolean;
}
