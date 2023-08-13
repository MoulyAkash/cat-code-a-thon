import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../../App.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import APIService from "../../api/Service";

export const NavContext = createContext<any>({});
export const GetUserProductsContext = createContext<any>(null);

export default function MainApp() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
}
