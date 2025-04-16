import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import Button from "../components/Button";

export default function SignupPage() {
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);
  const Navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (data.password != data.confirmPassword) {
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

    await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    Navigate("/", { state: { message: "User inserido com sucesso" } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-2">Welcome on board!</h1>
      <p className="mb-5">
        We just need a little bit of data from you to get you started 🚀
      </p>

      <div className="card p-4">
        <div class="mb-3">
          <label htmlFor="email" class="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            class="form-control"
            required
          />
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
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            class="form-control"
            required
          />
          {passwordNotEqual && <p>As passwords não coincidem</p>}
        </div>

        <div class="mb-3">
          <label htmlFor="first-name" class="form-label">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            class="form-control"
            name="first-name"
            required
          />
        </div>

        <div class="mb-3">
          <label htmlFor="last-name" class="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            class="form-control"
            name="last-name"
            required
          />
        </div>

        <div class="mb-3">
          <label htmlFor="phone" class="form-label">
            What best describes your role?
          </label>
          <select id="role" name="role" class="form-select" required>
            <option value="chef">Chef</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <div>
          <Button text="Sign Up" className="btn btn-primary" />
        </div>
      </div>
    </form>
  );
}
