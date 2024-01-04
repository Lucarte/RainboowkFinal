type Props = {
	search: string;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	availableOnly: { [key: string]: boolean };
	onAvailabilityChange: (language: string) => void;
};

const SearchBar = ({
	search,
	onSearchChange,
	availableOnly,
	onAvailabilityChange,
}: Props) => {
	return (
		<div className='flex flex-col gap-4 my-12'>
			<input
				className='box-border h-8 p-4 border-2 w-60 text-violet-800 border-cyan-500'
				type='text'
				placeholder='Search...'
				value={search}
				onChange={(e) => onSearchChange(e)}
			/>
			Only show books (or translations) in:
			<ul>
				<li>
					<label className='flex gap-4' htmlFor='#'>
						<input
							type='checkbox'
							checked={availableOnly.english}
							onChange={() => onAvailabilityChange("english")}
						/>
						English
					</label>
				</li>
				<li>
					<label className='flex gap-4' htmlFor='#'>
						<input
							type='checkbox'
							checked={availableOnly.spanish}
							onChange={() => onAvailabilityChange("spanish")}
						/>
						Spanish
					</label>
				</li>
				<li>
					<label className='flex gap-4' htmlFor='#'>
						<input
							type='checkbox'
							checked={availableOnly.french}
							onChange={() => onAvailabilityChange("french")}
						/>
						French
					</label>
				</li>
				<li>
					<label className='flex gap-4' htmlFor='#'>
						<input
							type='checkbox'
							checked={availableOnly.german}
							onChange={() => onAvailabilityChange("german")}
						/>
						German
					</label>
				</li>
			</ul>
			{/* <label>
				<input type='checkbox'></input>
			</label> */}
		</div>
	);
};

export default SearchBar;
