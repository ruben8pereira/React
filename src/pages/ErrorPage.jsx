import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="container py-xl text-center">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-xl slide-up">
            <h1 className="display-1 text-primary mb-lg">404</h1>
            <h3 className="mb-md">Page Not Found</h3>
            <p className="text-subtext mb-xl">
              The page you are looking for might have been removed,
              had its name changed, or is temporarily unavailable.
            </p>
            <div>
              <Link to="/" className="btn btn-lg">
                Return to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}