import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "./Button";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="navbar navbar-expand-lg bd-navbar sticky-top">
      <nav className="container justify-content-center algin-items-center">
        <ul className="navbar-nav gap-4 align-items-center">
          <li className="nav-item">
            <a href="/">Home</a>
          </li>
          {user && user.role === "manager" && (
            <>
              <li className="nav-item">
                <a href="/menus">Todos os Menus</a>
              </li>
              <li className="nav-item">
                <a href="/create-menu">Criar Menu</a>
              </li>
            </>
          )}
          {user && user.role === "customer" && (
            <li className="nav-item">
              <a href="/order">Fazer Pedido</a>
            </li>
          )}
          {user && user.role === "chef" && (
            <li className="nav-item">
              <a href="/kitchen">Todos os Pedidos</a>
            </li>
          )}
          {user ? (
            <li className="nav-item">
              <Button
                onClick={logout}
                className="btn btn-danger"
                text="Logout"
                type="button"
              />
            </li>
          ) : (
            <>
              <li className="nav-item">
                <a href="/signup">Registo</a>
              </li>
              <li className="nav-item">
                <a href="/login">Login</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
