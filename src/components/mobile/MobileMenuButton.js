import React from "react";

const MobileMenuButton = ({ isMenuActive, handleIsMenuActive }) => {
  return (
    <div className="-mr-2 flex items-center sm:hidden">
      {/* {<!-- Mobile menu button -->} */}
      <button
        onClick={() => handleIsMenuActive(!isMenuActive)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
      >
        {/* {<!-- Menu open: "hidden", Menu closed: "block" -->} */}
        <svg
          className={`${isMenuActive ? "hidden" : "block"} h-6 w-6`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        {/* {<!-- Menu open: "block", Menu closed: "hidden" -->} */}
        <svg
          className={`${isMenuActive ? "block" : "hidden"} h-6 w-6`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default MobileMenuButton;
