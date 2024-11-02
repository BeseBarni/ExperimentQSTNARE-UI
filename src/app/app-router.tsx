import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useMemo } from "react";
import { routes } from "./app-routes";
const basename = import.meta.env.VITE_BASE_NAME;

export const AppRouter = () => {
  const router = useMemo(
    () => createBrowserRouter(routes, { basename: basename }),
    []
  );

  return <RouterProvider router={router}></RouterProvider>;
};
