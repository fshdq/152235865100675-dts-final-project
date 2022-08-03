import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom";

const Profile = () => {
  const tabs = [
    { name: "My Favorite Games", href: "/my-favorites", current: false },
    { name: "My Wishlist", href: "/my-wishlists", current: false },
    { name: "My Library", href: "/my-library", current: true },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="max-w-7xl mx-auto my-10 sm:px-6 lg:px-8">
      <div className="pb-5 border-b border-zinc-700">
        <h3 className="text-4xl leading-6 font-bold text-white">Hello</h3>
      </div>
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={`/profile${tab.href}`}
                className={
                  (({ isActive }) =>
                    isActive
                      ? "whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm border-white text-white hover:text-zinc-400 hover:border-zinc-400"
                      : "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-zinc-500 hover:text-zinc-400 hover:border-zinc-400")
                }
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className="my-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
