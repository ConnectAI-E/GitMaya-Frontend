import { Outlet } from 'react-router-dom';
import { Footer } from '@/layout/footer';
import { Navbar } from '@/layout/narbar';

const Layout = () => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="pt-32 flex-grow w-full">
        <Outlet />
      </main>
      <Footer className="bg-dark" />
    </div>
  );
};

export default Layout;
