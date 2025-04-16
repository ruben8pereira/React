import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function CreateMenuPage() {
  const navigate = useNavigate();
  const [starter, setStarter] = useState("");
  const [main, setMain] = useState("");
  const [dessert, setDessert] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.starter || !data.main || !data.dessert) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const response = await fetch("http://localhost:3000/menus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Erro ao criar o menu.");
      return;
    }

    const result = await response.json();

    if (result) {
      setError(null);
      navigate("/menus");
    } else {
      setError("Erro ao criar o menu.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Menu</h2>

      <div className="card p-4">
        {error && <p className="error">{error}</p>}

        <div className="mb-3">
          <label htmlFor="starter" className="form-label">
            Entradas
          </label>
          <input
            name="starter"
            onChange={(event) => setStarter(event.target.value)}
            value={starter}
            required
            className="form-control"
            id="starter"
            type="text"
            placeholder="Ex: Salada Caesar"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="main" className="form-label">
            Prato Principal
          </label>
          <input
            name="main"
            onChange={(event) => setMain(event.target.value)}
            value={main}
            required
            className="form-control"
            id="main"
            type="text"
            placeholder="Ex: Filé à Parmegiana"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dessert">Sobremesas</label>
          <input
            name="dessert"
            onChange={(event) => setDessert(event.target.value)}
            value={dessert}
            required
            className="form-control"
            id="dessert"
            type="text"
            placeholder="Ex: Pudim"
          />
        </div>
        <div>
          <Button text="Salvar" className="btn btn-primary" />
        </div>
      </div>
    </form>
  );
}
