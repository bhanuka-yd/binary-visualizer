import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BinaryVisualizer from "./BinaryVisualizer.jsx";
import BitwiseOperationVisualizer from "./BitwiseOperationVisualizer.jsx";
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <div className="flex flex-col">
          <div className="flex flex-row p-10 gap-x-10 text-lg">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "underline font-bold underline-offset-4 text-blue-500"
                  : "cursor-pointer hover:underline underline-offset-4 text-white"
              }
            >
              Binary Visualizer (32-bit)
            </NavLink>
            <NavLink
              to="/binary-ops-visualizer"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "underline font-bold underline-offset-4 text-blue-500"
                  : "cursor-pointer hover:underline underline-offset-4 text-white"
              }
            >
              Binary Operations Visualizer(32-bit)
            </NavLink>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      ),
      children: [
        {
          path: "",
          element: <BinaryVisualizer />,
        },
        {
          path: "binary-ops-visualizer",
          element: <BitwiseOperationVisualizer />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <div className="h-screen flex flex-col">
          <div className="text-center text-3xl mt-auto">Not Found :(</div>
          <div className="mb-auto">
            <a
              href="/binary-visualizer"
              className="text-gray-500 text-center cursor-pointer underline-offset-4 hover:underline"
            >
              {"<-"} go to home
            </a>
          </div>
        </div>
      ),
    },
  ],
  {
    basename: "/binary-visualizer",
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
