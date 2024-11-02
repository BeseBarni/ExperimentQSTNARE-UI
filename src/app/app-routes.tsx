import { RouteObject } from "react-router-dom";
import { AppLayout } from "src/components";

export type AppRoute = RouteObject & {
  name?: string;
  icon?: React.ReactNode;
  children?: AppRoute[];
};

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <AppLayout />,

    children: [
      {
        name: "main",
        index: true,
        element: <div>example</div>,
      },
    ],
  },
];

export const displayedRoutes = routes
  .flatMap(function loop(route): AppRoute[] {
    if (route?.children) return route.children.flatMap(loop);
    else return [route];
  })
  .filter((x) => x.name);
