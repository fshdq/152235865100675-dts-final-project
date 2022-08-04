import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import NavLink from "./NavLink";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <nav className="bg-zinc-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center font-black text-4xl text-white">
                GRAWG
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink link="/" name="Home" />
                <NavLink link="/browse" name="Browse Game" />
                <NavLink link="/genres" name="Genres" />
                {/* <NavLink link="/platforms" name="Platforms" /> */}
              </div>
            </div>
            <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user?.email ? (
                <div className="flex sm:gap-x-4 items-center md:order-2 ">
                  {/* <NavLink link="/my-library" name="My library" /> */}
                  <NavLink link="/profile" name="Profile" />
                  <button
                    onClick={handleLogout}
                    className="inline-flex flex-shrink-0 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="sm:gap-4 sm:flex">
                  <Link
                    className="block px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition rounded-md shadow"
                    to="/login"
                  >
                    Login
                  </Link>

                  <Link
                    className="hidden sm:block px-5 py-2.5 text-sm font-medium text-white bg-zinc-500 rounded-md hover:text-white/75 transition"
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-4 space-y-1">
            <a
              href="#"
              className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div> */}
      </nav>
    </>
  );
};

export default Navbar;
