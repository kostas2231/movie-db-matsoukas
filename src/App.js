import "./App.css";
import "./Styles/Sidebar.css";
import Sidebar from "./Components/Sidebar";
import Content from "./Components/Content";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MoviesService from "./Services/MoviesDb_service.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="wrapper">
        <Sidebar />
        <Outlet />
        <Navigate to="/37/1" />
      </div>
    ),
    children: [
      {
        path: "/:genre/:page",
        element: <Content />,
        loader: async ({ request, params }) => {
          return MoviesService.getMoviesByGenre({
            language: "el-GR",
            with_genres: params.genre,
            page: params.page,
            sort_by: "popularity.desc",
          });
        },
      },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router}>
      <div className="card-box"></div>
    </RouterProvider>
  );
}
