/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				comic: "Comic Neue",
				kids: "Sevillana",
				kids2: "Bungee Shade",
				elmessiri: "El Messiri",
				archivo: "Archivo",
				comfortaa: "Comfortaa",
				roboto: "Roboto",
				rubik: "Rubik Doodle Shadow",
			},
			// screens: {
			// 	xs: 400px ODER ODER
			// },
		},
	},
	plugins: [],
};
