import { createBrowserRouter } from "react-router-dom";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { IoNavigateOutline } from "react-icons/io5";

import MainApp from "./pages/user/MainApp";
import Dashboard from "./pages/user/Dashboard/Dashboard";
import Test from "./pages/test/Test";

const generateAppData = (routes: any) => {
  const sideBarItems = Object.entries(routes).map(([path, route]: any) => ({
    Icon: route.Icon, // Replace this with the appropriate Icon based on the route if needed
    path,
    title: route.title,
  }));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainApp />,
      children: Object.entries(routes).map(([path, route]: any) => ({
        path: path.replace("/", ""), // Removing the leading '/' from the path
        element: route.element,
      })),
    },
  ]);

  return { routes, sideBarItems, router };
};

// Single source of truth for the routes
const allRoutes = {
  "/dashboard": {
    title: "Dashboard",
    description: "Dashboard",
    element: <Dashboard />,
    Icon: IoNavigateOutline,
  },
  "/test": {
    title: "Test",
    description: "Test",
    element: <Test />,
    Icon: BiSolidBarChartAlt2,
  },
};

// Generate the derived objects
const { routes, sideBarItems, router } = generateAppData(allRoutes);

export { routes, sideBarItems, router };
