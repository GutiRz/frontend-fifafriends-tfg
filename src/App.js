import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";
import { TeamsContextProvider } from "./context/TeamsContext";

import moment from "moment";

export const App = () => {
  const { token, expiredDate } = useContext(AuthContext);

  const isLogged = token && expiredDate && expiredDate - moment().seconds() > 0;

  return isLogged ? (
    <TeamsContextProvider>
      <AuthenticatedApp />
    </TeamsContextProvider>
  ) : (
    <UnauthenticatedApp />
  );
};
