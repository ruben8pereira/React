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
    <form onSubmit={handleSubmit} className="auth-form container-sm py-5 fade-in">
      <h1 className="auth-title text-center">Login</h1>
      
      {error && <div className="auth-error">{error}</div>}
      
      <div className="card p-lg slide-up">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <div className="input-icon">
            <input 
              name="email" 
              id="email" 
              className="form-control" 
              required 
              type="email"
              placeholder="E-mail"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-icon">
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              required
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <Button className="btn w-100" text="Sign In" />
        </div>
        
        <div className="auth-footer mt-md">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </form>
  );
}