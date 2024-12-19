import { ReactNode } from 'react';
import { Button } from '@/components/ui/button'
import { Sidebar } from '../components/Sidebar';
import  Navbar from './Navbar';


interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
     
       {/*  <Navbar /> */}

        {/* Main Area */}
        <main >{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;