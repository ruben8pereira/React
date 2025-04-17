import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10 text-center">
          <h1 className="display-4 mb-4">Welcome to Restaurant Management System</h1>
          
          <div className="card mb-4">
            <div className="card-body p-4">
              <p className="lead">
                This is the restaurant's order management system. You can
                create menus, view orders, and manage the kitchen efficiently.
              </p>
            </div>
          </div>
          
          {user ? (
            <div className="row mt-5">
              {user.role === "manager" && (
                <>
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-primary">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">Manage Menus</h5>
                        <p className="card-text flex-grow-1">
                          Create, view, and manage the restaurant's available menus.
                        </p>
                        <Link to="/menus" className="btn btn-primary">View Menus</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-success">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">Create New Menu</h5>
                        <p className="card-text flex-grow-1">
                          Add new menus with appetizers, main courses, and desserts.
                        </p>
                        <Link to="/create-menu" className="btn btn-success">Create Menu</Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {user.role === "customer" && (
                <div className="col-md-6 mb-4 mx-auto">
                  <div className="card h-100 border-warning">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">Place Order</h5>
                      <p className="card-text flex-grow-1">
                        Choose from our delicious menus and place your order.
                      </p>
                      <Link to="/order" className="btn btn-warning">Place Order</Link>
                    </div>
                  </div>
                </div>
              )}
              
              {user.role === "chef" && (
                <div className="col-md-6 mb-4 mx-auto">
                  <div className="card h-100 border-danger">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">Manage Orders</h5>
                      <p className="card-text flex-grow-1">
                        View and update the status of orders in the kitchen.
                      </p>
                      <Link to="/kitchen" className="btn btn-danger">View Orders</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="row mt-5">
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Already have an account?</h5>
                    <p className="card-text flex-grow-1">
                      Log in to access the restaurant management system.
                    </p>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">New here?</h5>
                    <p className="card-text flex-grow-1">
                      Create an account to start using our system.
                    </p>
                    <Link to="/signup" className="btn btn-success">Sign Up</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}