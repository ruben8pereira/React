import "./auth.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const user = {
      email: data.email,
      password: data.password,
    };

    const success = await login(user);

    if (success) {
      navigate("/");
    } else {
      alert("Login falhou");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-4">Login</h1>
      <div className="card p-4">
        <div class="mb-3">
          <label htmlFor="email" class="form-label">
            Email
          </label>
          <input name="email" id="email" class="form-control" />
        </div>

        <div class="mb-3">
          <label htmlFor="password" class="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            class="form-control"
          />
        </div>

        <div>
          <Button className="btn btn-primary" text="Login" />
        </div>
      </div>
    </form>
  );
}
