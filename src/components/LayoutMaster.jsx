import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutMaster() {
  return (
    <>
      <Header />
      <div className="container mt-3 my-md-4">
        <Outlet />
      </div>
      <Footer author="Rúben Pereira" year={2025} />
    </>
  );
}
