import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutMaster() {
  return (
    <div className="layout-container">
      <Header />
      <main className="container mt-md my-md-lg flex-grow">
        <Outlet />
      </main>
      <Footer author="Rúben Pereira" year={2025} />
    </div>
  );
}