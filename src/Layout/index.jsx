import { Link, Outlet } from "react-router-dom";
import "./index.css";

export default function Layout() {
  return (
    <main>
      <header>
        <h1>Router</h1>
      </header>
      <div className="contentWrap">
        <nav>
          <Link to={"/"}>HOME</Link>
          <p>POSTS</p>
          <p>BACK</p>
        </nav>
        <div className="postWrap">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
