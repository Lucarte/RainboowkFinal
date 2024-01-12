import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

// Errors
import RootError from "./errors/RootError";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
// import Dashboard from "./pages/Dashboard";
// import Unauthorized from "./pages/Unauthorized";
import Registration from "./pages/Registration";
import UsersList from "./pages/UserList";
import User from "./pages/User";
import Author from "./pages/Author";
import Authors from "./pages/Authors";
import Illustrators from "./pages/Illustrators";
import Illustrator from "./pages/Illustrator";
import Publishers from "./pages/Publishers";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Buch from "./pages/Buch";
import Buecher from "./pages/Buecher";
import Libro from "./pages/Libro";
import Libros from "./pages/Libros";
import Livres from "./pages/Livres";
import Livre from "./pages/Livre";
import About from "./pages/About";
import BookCatalog from "./pages/BookCatalog";
import Publisher from "./pages/Publisher";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			// All endpoints except: Login / Registration / Home NEED STYLING
			<Route path='/' element={<RootLayout />} errorElement={<RootError />}>
				// Open routes
				<Route index element={<Home />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/authors' element={<Authors />} />
				<Route path='/author/:slug' element={<Author />} />
				<Route path='/illustrators' element={<Illustrators />} />
				<Route path='/illustrator/:slug' element={<Illustrator />} />
				<Route path='/publishers' element={<Publishers />} />
				<Route path='/publisher/:name' element={<Publisher />} />
				<Route path='/books' element={<Books />} />
				<Route path='/book/:title' element={<Book />} />
				<Route path='/libros' element={<Libros />} />
				<Route path='/libro/:title' element={<Libro />} /> // Funktiontiert noch
				nicht
				<Route path='/livres' element={<Livres />} />
				<Route path='/livre/:title' element={<Livre />} /> // Funktiontiert noch
				nicht
				<Route path='/buecher' element={<Buecher />} />
				<Route path='/buch/:title' element={<Buch />} /> // Funktiontiert noch
				nicht
				<Route path='/about' element={<About />} /> // Needs content
				<Route path='/catalog' element={<BookCatalog />} />
				<Route path='/authors' element={<Authors />} />
				<Route path='/illustrators' element={<Illustrators />} />
				<Route path='/publishers' element={<Publishers />} />
				// For admin
				<Route element={<ProtectedLayout isAdmin={true} />}>
					<Route path='/users' element={<UsersList />} /> // need to fetch users
				</Route>
				// For signed users
				<Route element={<ProtectedLayout isAdmin={false} />}>
					<Route path='/user/:username' element={<User />} /> // Funktiontiert
					noch nicht
				</Route>
				{/* 
				NEED
				TO
				ADD
				ALL
				THE 
				OTHER
				ROUTES
				*/}
				<Route path='/login' element={<Login />} />
				// If I put it inside the RootLayout there is access to the nav links!
				<Route path='*' element={<NotFound />} />
			</Route>
		</>
	)
);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
