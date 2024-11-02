import { RouteObject } from "react-router-dom";
import { AppLayout } from "src/components";
import { ErrorPage, QuestionsPage } from "src/pages";

export type AppRoute = RouteObject & {
  name?: string;
  icon?: React.ReactNode;
  children?: AppRoute[];
};

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        name: "main",
        index: true,
        element: <div>example</div>,
      },
      {
        path: "questions",
        element: <QuestionsPage />,
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
