import { ReactNode } from 'react';
import { Button } from '@/components/ui/button'
import { SidebarUser } from '../components/SidebarUser';


interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardSecretaire = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarUser/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
     
       {/*  <Navbar /> */}

        {/* Main Area */}
        <main >{children}</main>
      </div>
    </div>
  );
};

export default DashboardSecretaire;