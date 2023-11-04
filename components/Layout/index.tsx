import { ReactNode } from 'react';

import LayoutProvider from '@/context/LayoutContext';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutProvider>
      <Navbar />
      <Sidebar />
      <main className="lg:pl-72 px-7 pt-24">{children}</main>
    </LayoutProvider>
  );
};

export default Layout;
