import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

// Errors
import RootError from "./errors/RootError";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import Blog, { blogloader } from "./pages/Blog";
import Blogpost, { blopostLoader } from "./pages/Blogpost";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<RootLayout />} errorElement={<RootError />}>
				<Route index element={<Home />} />
				// For admin
				<Route element={<ProtectedLayout role='admin' />}>
					<Route path='/dashboard' element={<Dashboard />} />
				</Route>
				<Route path='/unauthorized' element={<Unauthorized />} />
				// For signed users
				<Route element={<PrivateLayout role='user' />}>
					<Route path='/profile' element={<Dashboard />} />
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/blog'>
					<Route index element={<Blog />} loader={blogloader} />
					<Route path=':slug' element={<Blogpost />} loader={blopostLoader} />
				</Route>
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
