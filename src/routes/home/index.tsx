import { useUser } from '@/api';
const Home = () => {
  const { user } = useUser();
  console.log('Dogtiti ~ file: index.tsx:4 ~ Home ~ user:', user);

  return <h1 className=" text-black dark:text-white text-center">GitMaya</h1>;
};

export default Home;
