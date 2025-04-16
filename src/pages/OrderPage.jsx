import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function OrderPage() {
  const { user } = useContext(AuthContext);
  const [menus, setMenus] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await fetch("http://localhost:3000/menus", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMenus(data.menus);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const order = {
      customer: user.firstName + " " + user.lastName,
      menu: data.menu,
    };

    if (!order.customer || !order.menu) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      setError("Erro ao criar o pedido.");
      return;
    }

    const result = await response.json();

    if (result) {
      setError(null);
      setSuccess("Pedido criado com sucesso!");
      setSelectedMenu("");
    } else {
      setError("Erro ao criar o menu.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-4">Fazer Pedido</h1>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="bd-example m-0 border-0">
        <div className="control no-margin">
          <label htmlFor="menu">Menu</label>
          <select
            name="menu"
            onChange={(e) => setSelectedMenu(e.target.value)}
            id="menu"
            required
            value={selectedMenu}
          >
            <option value="">Selecione um Menu</option>
            {menus &&
              menus.map((menu) => (
                <option key={menu.id} value={menu.name}>
                  {menu.starter} - {menu.main} - {menu.dessert}
                </option>
              ))}
          </select>
        </div>
      </div>

      <p className="form-actions">
        <Button text="Salvar" />
      </p>
    </form>
  );
}
