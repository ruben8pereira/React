import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import Button from "../components/Button";

export default function SignupPage() {
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      setPasswordNotEqual(true);
      return;
    } else {
      setPasswordNotEqual(false);
    }

    const user = {
      email: data.email,
      password: data.password,
      firstName: data["first-name"],
      lastName: data["last-name"],
      role: data.role,
      termsAccepted: data.terms === "on",
    };

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      navigate("/login", { state: { message: "User registered successfully!" } });
    } catch (err) {
      setError("Error registering user. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h1 className="auth-title">Welcome!</h1>
      <p className="auth-subtitle">
        We just need a few details to get you started 🚀
      </p>

      {error && <div className="auth-error">{error}</div>}

      <div className="card p-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            required
            placeholder="your.email@example.com"
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

        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            className="form-control"
            required
            placeholder="Type your password again"
          />
          {passwordNotEqual && <p className="password-mismatch">Passwords don't match</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="first-name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            className="form-control"
            name="first-name"
            required
            placeholder="Your first name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last-name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            className="form-control"
            name="last-name"
            required
            placeholder="Your last name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            What's your role?
          </label>
          <select id="role" name="role" className="form-select" required>
            <option value="">Select an option</option>
            <option value="chef">Chef</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
            name="terms"
            required
          />
          <label className="form-check-label" htmlFor="terms">
            I accept the terms and conditions
          </label>
        </div>

        <div>
          <Button text="Sign Up" className="btn btn-primary w-100" />
        </div>
        
        <div className="auth-footer mt-3">
          Already have an account? <a href="/login">Sign In</a>
        </div>
      </div>
    </form>
  );
}