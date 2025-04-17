import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-5">
            <h1 className="display-1 text-danger mb-4">404</h1>
            <h3 className="mb-4">Page Not Found</h3>
            <p className="mb-4">
              The page you are looking for might have been removed,
              had its name changed, or is temporarily unavailable.
            </p>
            <div>
              <Link to="/" className="btn btn-primary">
                Return to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}