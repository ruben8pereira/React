import { useState, useEffect } from "react";

export default function KitchenPage() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/orders");
      
      if (!response.ok) {
        throw new Error("Failed to load orders");
      }
      
      const data = await response.json();
      setOrders(data.orders);
      setError(null);
    } catch (err) {
      setError("Error loading orders. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsDelivered = async (id) => {
    try {
      setUpdating(true);
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Delivered" }),
      });

      if (!response.ok) {
        throw new Error("Error updating order.");
      }

      await getOrders();
    } catch (error) {
      console.error("Error updating order:", error);
      setError("Could not update the order. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-xl text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-sm text-subtext">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-xl">
        <div className="card p-lg bg-light border-danger">
          <div className="text-primary mb-md font-medium">{error}</div>
          <button className="btn" onClick={getOrders}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-xl fade-in">
      <div className="card p-lg mb-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-primary">Kitchen Orders</h2>
          <button 
            className="btn btn-text" 
            onClick={getOrders}
            disabled={updating}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>Refresh
          </button>
        </div>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="card p-xl text-center five-guys-pattern">
          <h3 className="mb-md text-primary">No Orders Found</h3>
          <p className="text-subtext">The kitchen is currently empty. Orders will appear here when customers place them.</p>
          <div className="mt-lg">
            <button className="btn btn-secondary" onClick={getOrders}>
              <i className="bi bi-arrow-clockwise me-2"></i>
              Check Again
            </button>
          </div>
        </div>
      ) : (
        <div className="card p-lg table-responsive slide-up">
          <h3 className="mb-lg font-medium text-lg">Active Orders</h3>
          <table className="table table-hover mb-0">
              <thead>
                <tr className="bg-light">
                  <th scope="col" className="py-md px-lg border-0">ID</th>
                  <th scope="col" className="py-md px-lg border-0">Customer</th>
                  <th scope="col" className="py-md px-lg border-0">Menu</th>
                  <th scope="col" className="py-md px-lg border-0">Status</th>
                  <th scope="col" className="py-md px-lg border-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className={order.status === "Delivered" ? "bg-light" : ""}>
                    <td className="py-md px-lg">{order.id}</td>
                    <td className="py-md px-lg font-medium">{order.customer}</td>
                    <td className="py-md px-lg">{order.menu}</td>
                    <td className="py-md px-lg">
                      <span className={`badge ${order.status === "Delivered" ? "badge-success" : "badge-warning"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-md px-lg">
                      {order.status !== "Delivered" ? (
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={() => markAsDelivered(order.id)}
                          disabled={updating}
                        >
                          Mark as Delivered
                        </button>
                      ) : (
                        <span className="text-subtext delivered">DELIVERED</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          
          <div className="flex justify-center mt-lg">
            <button 
              className="btn btn-secondary" 
              onClick={getOrders} 
              disabled={updating}
            >
              <i className="bi bi-arrow-repeat me-2"></i>
              Refresh Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}