import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Book from "./Book";
import { ApiBookInfo } from "../types/SingleBookInfo";
import CatalogLanguage from "./CatalogLanguage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import http from "../utils/http";
import Books from "./Books";
import Libros from "./Libros";
import Buecher from "./Buecher";
import Livres from "./Livres";

type CatalogLan = string | null;

const BookCatalog = () => {
	// Define unsere State
	const [search, setSearch] = useLocalStorage("bookSearch", "");
	const [books, setBooks] = useState<ApiBookInfo[]>([]);

	// only check for true. Default false = checkbox unclicked
	const [availableOnly, setAvailableOnly] = useState<{
		english: boolean;
		spanish: boolean;
		french: boolean;
		german: boolean;
		[key: string]: boolean;
	}>({
		english: true,
		spanish: true,
		french: true,
		german: true,
	});

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleAvailabilityChange = (language: keyof typeof availableOnly) => {
		// Logik für Sprachänderungen
		setAvailableOnly((prev) => ({
			...prev,
			[language]: !prev[language],
		}));
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await http.get("api/catalog", {
					headers: {
						Accept: "application/json",
					},
					maxRedirects: 0, // Disable redirects
				});

				console.log("API Response:", response);

				if (
					typeof response.data === "object" &&
					Array.isArray(response.data.books)
				) {
					// Extract the array from the "books" property
					const booksArray = response.data.books;
					setBooks(booksArray);
				} else {
					console.error("API response is not an array:", response.data);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			// Adjust the API endpoint based on your Laravel backend
	// 			const response = await axios.get("api/catalog");
	// 			console.log("API response:", response.data); // Log the response
	// 			setBooks(response.data);
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error);
	// 		}
	// 	};

	// 	fetchData();
	// }, []); // Empty dependency array to fetch data only on mount

	let lastCatalogLan: CatalogLan = null;
	const rows: JSX.Element[] = [];

	books.forEach((book) => {
		// implement filter logic
		const titleMatches = book.title
			.toLowerCase()
			.includes(search.toLowerCase());
		const languageMatches =
			(availableOnly.english && book.original_language === "english") ||
			(availableOnly.spanish && book.original_language === "spanish") ||
			(availableOnly.french && book.original_language === "french") ||
			(availableOnly.german && book.original_language === "german");

		if (!titleMatches || !languageMatches) {
			return;
		}

		// if (index === 0 || book.original_language !== books[index - 1].original_language) {
		if (book.original_language !== lastCatalogLan) {
			rows.push(
				<CatalogLanguage
					key={book.original_language}
					catalogLan={book.original_language}
					catalogLanLabel={`Books in ${book.original_language}`}
				/>
			);
		}
		rows.push(<Book key={book.title} book={book} />);
		lastCatalogLan = book.original_language;
	});
	// // Link to take users to the Add Book Form
	// <button>Add Book</button>;

	return (
		<section className='flex flex-col gap-6 mb-28'>
			{/* // 'onSearchChange' name would point to the event hooked to the setSearch, makes
			it quicker to infer, the info. */}
			<SearchBar
				search={search}
				onSearchChange={handleSearchChange}
				availableOnly={availableOnly}
				onAvailabilityChange={handleAvailabilityChange}
			/>
			<Books />
			{/* ? */}
			<Libros />
			<Livres />
			<Buecher />
			{rows}
		</section>
	);
};

export default BookCatalog;
