import { useState } from 'react';

import Sidebar from "../components/sideBar/SideBar.jsx";
import { Outlet } from 'react-router-dom';
import SidebarE from '../components/sideBar/SidebarE.jsx';
import Header from '../components/header/header.jsx';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-background text-content">
      <div className="flex h-screen overflow-hidden">
        <SidebarE sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="w-full overflow-y-auto overflow-x-hidden">
          <Header />
          <main>
            <div className="">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
