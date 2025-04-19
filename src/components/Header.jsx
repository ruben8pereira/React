import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Button from "./Button";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link to="/" className="logo navbar-brand">
          <h4 className="mb-0">Restaurant Management</h4>
        </Link>

        <button
          className="menu-toggle navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="nav-links navbar-nav align-items-center">
            {user && user.role === "manager" && (
              <>
                <li className="nav-item">
                  <Link to="/menus" className="nav-link">
                    All Menus
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create-menu" className="nav-link">
                    Create Menu
                  </Link>
                </li>
              </>
            )}

            {user && user.role === "customer" && (
              <li className="nav-item">
                <Link to="/order" className="nav-link">
                  Place Order
                </Link>
              </li>
            )}

            {user && user.role === "chef" && (
              <li className="nav-item">
                <Link to="/kitchen" className="nav-link">
                  Kitchen Orders
                </Link>
              </li>
            )}

            {user ? (
              <>
                <li className="nav-item mx-2">
                  <span className="badge bg-light text-dark p-2">
                    Hello, {user.firstName} (
                    {user.role === "chef"
                      ? "Chef"
                      : user.role === "manager"
                      ? "Manager"
                      : "Customer"}
                    )
                  </span>
                </li>
                <li className="nav-item">
                  <Button
                    onClick={logout}
                    className="btn btn-text"
                    text="Logout"
                    type="button"
                  />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="btn">
                    Login
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item mx-2">
              <ThemeSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
