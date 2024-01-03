import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/routes/home';
import Login from '@/routes/login';

import Layout from '@/layout';
import useDarkMode from 'use-dark-mode';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
]);

function App() {
	const darkMode = useDarkMode(false);
	return (
		<main
			className={`${
				darkMode.value ? 'dark' : ''
			} text-foreground bg-background`}
		>
			<RouterProvider
				router={router}
				fallbackElement={<div>Loading...</div>}
			/>
		</main>
	);
}

export default App;
