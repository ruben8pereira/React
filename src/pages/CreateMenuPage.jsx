import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function CreateMenuPage() {
  const navigate = useNavigate();
  const [starter, setStarter] = useState("");
  const [main, setMain] = useState("");
  const [dessert, setDessert] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.starter || !data.main || !data.dessert) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error creating menu.");
      }

      const result = await response.json();

      if (result) {
        setError(null);
        navigate("/menus");
      } else {
        setError("Error creating menu.");
      }
    } catch (err) {
      setError("Error creating menu. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-xl fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-xl text-center">Create New Menu</h2>

          <form onSubmit={handleSubmit}>
            <div className="card p-xl slide-up">
              {error && <div className="alert alert-danger mb-lg">{error}</div>}

              <div className="form-group">
                <label htmlFor="starter" className="form-label">
                  Appetizer
                </label>
                <input
                  name="starter"
                  onChange={(event) => setStarter(event.target.value)}
                  value={starter}
                  required
                  className="form-control"
                  id="starter"
                  type="text"
                  placeholder="Appetizer"
                />
              </div>

              <div className="form-group">
                <label htmlFor="main" className="form-label">
                  Main Plate
                </label>
                <input
                  name="main"
                  onChange={(event) => setMain(event.target.value)}
                  value={main}
                  required
                  className="form-control"
                  id="main"
                  type="text"
                  placeholder="Main Plate"
                />
              </div>

              <div className="form-group">
                <label htmlFor="dessert" className="form-label">
                  Dessert
                </label>
                <input
                  name="dessert"
                  onChange={(event) => setDessert(event.target.value)}
                  value={dessert}
                  required
                  className="form-control"
                  id="dessert"
                  type="text"
                  placeholder="Dessert"
                />
              </div>
              
              <div className="flex gap-md mt-xl">
                <Button 
                  text={loading ? "Saving..." : "Save Menu"} 
                  className="btn flex-grow-1" 
                  disabled={loading}
                />
                <button 
                  type="button" 
                  className="btn btn-secondary flex-grow-1" 
                  onClick={() => navigate("/menus")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}