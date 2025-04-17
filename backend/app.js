import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("./images"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/users", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json");
  const users = JSON.parse(fileContent);
  res.status(200).json({ users });
});

//MENUS
app.get("/menus", async (req, res) => {
  const fileContent = await fs.readFile("./data/menus.json");
  const menus = JSON.parse(fileContent);
  res.status(200).json({ menus });
});
app.post("/menus", async (req, res) => {
  const fileContent = await fs.readFile("./data/menus.json", "utf-8");
  const menus = JSON.parse(fileContent);

  const newMenu = req.body;
  newMenu.id = new Date().getTime().toString();
  menus.push(newMenu);

  await fs.writeFile("./data/menus.json", JSON.stringify(menus, null, 2));
  res.status(200).json({ message: "Menu Inserted!" });
});

//ORDERS
app.post("/orders", async (req, res) => {
  const fileContent = await fs.readFile("./data/orders.json", "utf-8");
  const orders = JSON.parse(fileContent);

  const newOrder = req.body;
  newOrder.id = new Date().getTime().toString();
  newOrder.status = "Preparing";
  orders.push(newOrder);

  await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 2));
  res.status(200).json({ message: "Order Inserted!" });
});
app.get("/orders", async (req, res) => {
  const fileContent = await fs.readFile("./data/orders.json");
  const orders = JSON.parse(fileContent);
  res.status(200).json({ orders });
});
app.put("/orders/:id", async (req, res) => {
  const fileContent = await fs.readFile("./data/orders.json", "utf-8");
  const orders = JSON.parse(fileContent);

  const orderId = req.params.id;
  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ message: "Order not found" });
  }

  orders[orderIndex] = { ...orders[orderIndex], ...req.body };

  await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 2));
  res.status(200).json({ message: "Order updated!" });
});

//USERS
app.post("/signup", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json", "utf-8");
  const users = JSON.parse(fileContent);

  const newUser = req.body;
  users.push(newUser);

  await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
  res.status(200).json({ message: "User Inserted!" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json");
  const users = JSON.parse(fileContent);

  const email = req.body.email;
  const password = req.body.password;

  const login = users.find((u) => u.email === email && u.password === password);

  if (!login) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  const AuthUser = {
    firstName: login.firstName,
    lastName: login.lastName,
    role: login.role,
  };

  res.json(AuthUser);
});

//404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000. Enjoy!");
});
