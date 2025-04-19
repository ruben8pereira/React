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
      <div className="container py-xl text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-sm">Loading menus...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-xl">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn" onClick={getMenus}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container py-xl fade-in">
      <div className="d-flex justify-between items-center mb-lg">
        <h2>All Menus</h2>
        <Link to="/create-menu" className="btn btn-secondary">
          <i className="bi bi-plus-circle me-2"></i>New Menu
        </Link>
      </div>

      {!menus || menus.length === 0 ? (
        <div className="alert alert-info">
          No menus found. Start by creating a new menu!
        </div>
      ) : (
       <div className="card p-lg">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr className="bg-light">
                  <th scope="col" className="py-md px-lg border-0">ID</th>
                  <th scope="col" className="py-md px-lg border-0">Appetizer</th>
                  <th scope="col" className="py-md px-lg border-0">Main Course</th>
                  <th scope="col" className="py-md px-lg border-0">Dessert</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu, index) => (
                  <tr key={menu.id} className={index % 2 === 0 ? "" : "bg-light"}>
                    <td className="py-md px-lg">{menu.id}</td>
                    <td className="py-md px-lg font-medium">{menu.starter}</td>
                    <td className="py-md px-lg font-medium">{menu.main}</td>
                    <td className="py-md px-lg font-medium">{menu.dessert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}