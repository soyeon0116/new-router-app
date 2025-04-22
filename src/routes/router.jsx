import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/posts", element: <PostList /> },
      { path: "/posts/:id", element: <PostDetail /> },
    ],
  },
]);
export default router;
