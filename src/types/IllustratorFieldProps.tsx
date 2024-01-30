import { FieldErrors } from "react-hook-form";
import { SingleBookInfo } from "./SingleBookInfo";

export interface IllustratorFieldProps {
	errors: FieldErrors<SingleBookInfo>;
	openIllustratorForm: () => void;
	closeIllustratorForm: () => void;
	setIsIllustratorFormVisible: (isVisible: boolean) => void;
	setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
	illustratorIndex: number;
	handleCheckIllustratorExistence: (
		illustratorIndex: number,
		formData: SingleBookInfo
	) => Promise<number | null>;
	illustratorId: number | null;
	isIllustratorFormVisible: null | boolean;
}
