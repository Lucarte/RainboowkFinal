import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AdminLayout from "./layouts/AdminLayout";

// Errors
import RootError from "./errors/RootError";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
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
import BookForm from "./pages/BookForm";
import AuthorForm from "./pages/AuthorForm";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			// All endpoints except: Login / Registration / Home NEED STYLING
			<Route path='/' element={<RootLayout />} errorElement={<RootError />}>
				// Open routes
				<Route index element={<Home />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='/authors' element={<Authors />} />
				<Route path='/author/:slug' element={<Author />} />
				<Route path='/illustrators' element={<Illustrators />} />
				<Route path='/illustrator/:slug' element={<Illustrator />} />
				<Route path='/publishers' element={<Publishers />} />
				<Route path='/publisher/:name' element={<Publisher />} />
				<Route path='/books' element={<Books />} />
				<Route path='/book/:title' element={<Book />} />
				<Route path='/libros' element={<Libros />} />
				<Route path='/libro/:title' element={<Libro />} />
				<Route path='/livres' element={<Livres />} />
				<Route path='/livre/:title' element={<Livre />} />
				<Route path='/buecher' element={<Buecher />} />
				<Route path='/buch/:title' element={<Buch />} />
				<Route path='/about' element={<About />} />
				<Route path='/catalog' element={<BookCatalog />} />
				<Route path='/authors' element={<Authors />} />
				<Route path='/illustrators' element={<Illustrators />} />
				<Route path='/publishers' element={<Publishers />} />
				// For admin
				<Route element={<AdminLayout />}>
					<Route path='/users' element={<UsersList />} />
				</Route>
				// For signed users (OR admin)
				<Route element={<ProtectedLayout />}>
					<Route path='/auth/book/form' element={<BookForm />} />
					Funktiontiert so: /auth/book/form
					<Route path='/user/:username' element={<User />} />
					<Route path='/auth/book/create' element={<BookForm />} />
					<Route path='/auth/book/update/:title' element={<BookForm />} />
					<Route path='/auth/book/delete/:title' element={<BookForm />} />
					<Route path='/auth/create_author' element={<AuthorForm />} />
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
