import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <h1>404</h1>
      <h3>Are you lost? Page not found.</h3>
      <Link to="/">Home</Link>
    </div>
  );
}
