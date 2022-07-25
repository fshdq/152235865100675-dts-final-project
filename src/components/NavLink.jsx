import React from "react";
import { Link } from "react-router-dom";

const NavLink = (props) => {
  return (
    <>
      <Link
        to={props.link}
        className="text-white inline-flex items-center px-1 pt-1 border-b-4 text-sm hover:font-medium border-transparent hover:border-cyan-500 transition-colors ease-in-out"
      >
        {props.name}
      </Link>
    </>
  );
};

export default NavLink;
