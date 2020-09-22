import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavOptions = () => {
  const location = useLocation();

  return (
    <div className="hidden sm:ml-6 sm:flex">
      <Link
        to="/dashboard"
        className={`${
          location.pathname === "/dashboard"
            ? "border-indigo-500 text-gray-900 focus:border-indigo-700"
            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
        } border-transparent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out`}
      >
        Dashboard
      </Link>
      <Link
        to="/competitions"
        className={`${
          location.pathname === "/competitions"
            ? "border-indigo-500 text-gray-900 focus:border-indigo-700"
            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
        } border-transparent ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out`}
      >
        Competiciones
      </Link>
      <Link
        to="/market"
        className={`${
          location.pathname === "/market"
            ? "border-indigo-500 text-gray-900 focus:border-indigo-700"
            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
        } border-transparent ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out`}
      >
        Mercado
      </Link>
      <Link
        to="/live"
        className={`${
          location.pathname === "/live"
            ? "border-indigo-500 text-gray-900 focus:border-indigo-700"
            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
        } border-transparent ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out`}
      >
        En vivo
      </Link>
    </div>
  );
};

export default NavOptions;
