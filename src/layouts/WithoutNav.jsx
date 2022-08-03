import React from "react";
import { Outlet } from "react-router-dom";

const WithoutNav = () => {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
};

export default WithoutNav;
