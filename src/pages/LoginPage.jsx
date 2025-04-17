import "./auth.css";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
      setError("Incorrect email or password. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h1 className="auth-title">Login</h1>
      
      {error && <div className="auth-error">{error}</div>}
      
      <div className="card p-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input 
            name="email" 
            id="email" 
            className="form-control" 
            required 
            type="email"
            placeholder="Your email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            required
            placeholder="Your password"
          />
        </div>

        <div>
          <Button className="btn btn-primary w-100" text="Sign In" />
        </div>
        
        <div className="auth-footer mt-3">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </form>
  );
}