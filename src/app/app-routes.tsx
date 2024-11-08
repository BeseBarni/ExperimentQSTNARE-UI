import { RouteObject } from "react-router-dom";
import { AppLayout } from "src/components";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  ErrorPage,
  ParticipantsPage,
  QuestionsPage,
  RegisterPage,
} from "src/pages";

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
        index: true,
        element: <div>example</div>,
      },
      {
        name: "New participant",
        icon: <AddReactionIcon />,
        path: "register",
        element: <RegisterPage />,
      },
      {
        name: "Participants",
        icon: <PeopleAltIcon />,
        path: "participants",
        element: <ParticipantsPage />,
      },
    ],
  },
  {
    path: "/questions",
    element: <QuestionsPage />,
  },
];

export const displayedRoutes = routes
  .flatMap(function loop(route): AppRoute[] {
    if (route?.children) return route.children.flatMap(loop);
    else return [route];
  })
  .filter((x) => x.name);
