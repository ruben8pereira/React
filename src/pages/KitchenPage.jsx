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
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={getOrders}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Kitchen Orders</h2>
        <button 
          className="btn btn-outline-primary" 
          onClick={getOrders}
          disabled={updating}
        >
          <i className="bi bi-arrow-clockwise me-2"></i>Refresh
        </button>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="alert alert-info">
          No orders found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Menu</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className={order.status === "Delivered" ? "table-success" : ""}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.menu}</td>
                  <td>
                    <span className={`badge ${order.status === "Delivered" ? "bg-success" : "bg-warning"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status !== "Delivered" ? (
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => markAsDelivered(order.id)}
                        disabled={updating}
                      >
                        Mark as Delivered
                      </button>
                    ) : (
                      <span className="text-muted">Order delivered</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}