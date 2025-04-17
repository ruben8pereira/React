import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function OrderPage() {
  const { user } = useContext(AuthContext);
  const [menus, setMenus] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/menus", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to load menus");
      }
      
      const data = await response.json();
      setMenus(data.menus);
      setError(null);
    } catch (err) {
      setError("Error loading menus. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Find the complete menu based on selection
    const selectedMenuDetails = menus.find(menu => {
      const menuName = `${menu.starter} - ${menu.main} - ${menu.dessert}`;
      return menuName === data.menu;
    });

    const order = {
      customer: user.firstName + " " + user.lastName,
      menu: data.menu,
    };

    if (!order.customer || !order.menu) {
      setError("All fields are required.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Error creating order.");
      }

      const result = await response.json();

      if (result) {
        setSuccess("Order placed successfully! The chef is preparing your meal.");
        setSelectedMenu("");
      } else {
        throw new Error("Error creating order.");
      }
    } catch (err) {
      setError("Error placing order. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading available menus...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4 text-center">Place Order</h1>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}

          <div className="card p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h5>Customer: {user.firstName} {user.lastName}</h5>
              </div>

              <div className="mb-3">
                <label htmlFor="menu" className="form-label">Select a Menu</label>
                <select
                  name="menu"
                  id="menu"
                  className="form-select"
                  value={selectedMenu}
                  onChange={(e) => setSelectedMenu(e.target.value)}
                  required
                >
                  <option value="">-- Select a Menu --</option>
                  {menus && menus.length > 0 ? (
                    menus.map((menu) => (
                      <option 
                        key={menu.id} 
                        value={`${menu.starter} - ${menu.main} - ${menu.dessert}`}
                      >
                        {menu.starter} - {menu.main} - {menu.dessert}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No menus available</option>
                  )}
                </select>
              </div>

              {selectedMenu && (
                <div className="card mb-3 bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Order Summary</h5>
                    <p className="mb-1"><strong>Selected menu:</strong> {selectedMenu}</p>
                    <p><strong>Customer:</strong> {user.firstName} {user.lastName}</p>
                  </div>
                </div>
              )}

              <div className="d-grid gap-2">
                <Button 
                  text={submitting ? "Processing..." : "Confirm Order"} 
                  className="btn btn-primary"
                  disabled={submitting || !selectedMenu}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}