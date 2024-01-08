import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navbar';
import { ReactNode } from 'react';

const AppLayout = () => {
  return (
    <div className="relative flex flex-col h-screen ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export const Hero = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="bg-black pb-32">
      <header className="pt-10 pb-10">
        <div className="max-w-7xl mx-auto">{children}</div>
      </header>
    </div>
  );
};

export default AppLayout;
