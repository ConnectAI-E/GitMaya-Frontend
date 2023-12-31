import useDarkMode from 'use-dark-mode';
const Home = () => {
	const darkMode = useDarkMode(false);
	return <h1 className='text-black dark:text-white text-center'>GitMaya</h1>;
};

export default Home;
