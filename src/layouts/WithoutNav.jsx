import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const WithoutNav = () => {
  return (
    <>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default WithoutNav;
