import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '@/components/navbar';

const Layout = () => {
	return (
		<div className='relative flex flex-col h-screen'>
			<Navbar />
			<main className='container mx-auto max-w-7xl pt-32 px-6 flex-grow'>
				<Outlet />
			</main>
			<footer className='w-full flex items-center justify-center py-3'>
				<Link
					className='flex items-center gap-1 text-current'
					to='https://github.com/ConnectAI-E/GitMaya-Frontend'
					title='nextui.org homepage'
				>
					<span className='text-default-600'>Powered by</span>
					<p className='text-primary'>GitMaya</p>
				</Link>
			</footer>
		</div>
	);
};

export default Layout;
