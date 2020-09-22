import React from "react";
import NavBar from "./header/NavBar";
import MainContainer from "./MainContainer";

export const Shell = ({ children, header }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="">
        {header}
        <MainContainer children={children} />
      </div>
    </div>
  );
};
