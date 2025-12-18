import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const mainLayout = () => {
  return (
    <div className="lg:flex">
      <div className="hidden lg:block w-1/4">
        <Sidebar />
      </div>
      <div className="w-full lg:w-3/4">
        <Outlet />
      </div>
    </div>
  );
};

export default mainLayout;

/*

OLD LAYOUT 
 <div className="container mx-auto flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>

*/
