import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function KitchenPage() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const response = await fetch("http://localhost:3000/orders");
    const data = await response.json();
    setOrders(data.orders);
  };

  const markAsDelivered = async (id) => {
    const response = await fetch(`http://localhost:3000/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Entregue" }),
    });

    if (response.ok) {
      await getOrders();
    } else {
      console.error("Erro ao atualizar o pedido.");
    }
  };

  return (
    <div>
      <h2>Todos os Pedidos</h2>

      {!orders ? (
        "Nenhum pedido encontrado."
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome do Cliente</th>
              <th scope="col">Menu</th>
              <th scope="col">Status</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td scope="row">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.menu}</td>
                <td>{order.status}</td>
                <td>
                  {order.status !== "Entregue" && (
                    <button onClick={() => markAsDelivered(order.id)}>
                      Marcar como Entregue
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
