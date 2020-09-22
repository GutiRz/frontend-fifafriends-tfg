import React from "react";

const MainContainer = ({ children }) => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto sm:px-6 lg:px-8 ">{children}</div>
    </main>
  );
};

export default MainContainer;
