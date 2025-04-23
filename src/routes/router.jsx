import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import PostEdit from "../pages/PostEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/posts", element: <PostList /> },
      { path: "/posts/:id", element: <PostDetail /> },
      { path: "/posts/:id/edit", element: <PostEdit /> },
    ],
  },
]);
export default router;
