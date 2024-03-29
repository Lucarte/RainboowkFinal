type Props = {
	catalogLan: string;
	catalogLanLabel: string;
};

const CatalogLanguage = ({ catalogLan, catalogLanLabel }: Props) => {
	console.log(
		"Catalog Language:",
		catalogLan,
		"Catalog Label:",
		catalogLanLabel
	);
	return (
		<h2 className='text-2xl font-bold'>
			{catalogLanLabel || `Catalog Language: ${catalogLan}`}
		</h2>
	);
};

export default CatalogLanguage;
