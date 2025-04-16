import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function MenusPage() {
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await fetch("http://localhost:3000/menus");
    const data = await response.json();
    setMenus(data.menus);
  };

  return (
    <div>
      <h2>Todos os Pedidos</h2>

      {!menus ? (
        "Nenhum menu encontrado."
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Entradas</th>
              <th scope="col">Prato Principal</th>
              <th scope="col">Sobremesas</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id}>
                <td scope="row">{menu.id}</td>
                <td>{menu.starter}</td>
                <td>{menu.main}</td>
                <td>{menu.dessert}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
