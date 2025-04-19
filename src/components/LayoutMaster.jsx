import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutMaster() {
  return (
    <>
      <Header />
      <div className="container mt-md my-md-lg">
        <Outlet />
      </div>
      <Footer author="Rúben Pereira" year={2025} />
    </>
  );
}