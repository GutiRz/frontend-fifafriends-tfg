import React, { createContext, useState } from "react";

export const TeamsContext = createContext({
  teams: [],
  setTeams: (value) => {},
});

export const TeamsContextProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  return (
    <TeamsContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamsContext.Provider>
  );
};
