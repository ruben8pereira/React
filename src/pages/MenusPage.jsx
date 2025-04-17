import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MenusPage() {
  const [menus, setMenus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/menus");
      
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

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading menus...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={getMenus}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Menus</h2>
        <Link to="/create-menu" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i>New Menu
        </Link>
      </div>

      {!menus || menus.length === 0 ? (
        <div className="alert alert-info">
          No menus found. Start by creating a new menu!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Appetizer</th>
                <th scope="col">Main Course</th>
                <th scope="col">Dessert</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id}>
                  <td>{menu.id}</td>
                  <td>{menu.starter}</td>
                  <td>{menu.main}</td>
                  <td>{menu.dessert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}