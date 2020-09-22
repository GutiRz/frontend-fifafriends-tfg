import React, { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalstorage";

export const AuthContext = createContext({
  token: "",
  setToken: (value) => {},
  expiredDate: 0,
  setExpiredDate: (value) => {},
  user: {},
  setUser: (value) => {}
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [expiredDate, setExpiredDate] = useLocalStorage("expired", null);
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ token, setToken, expiredDate, setExpiredDate, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
