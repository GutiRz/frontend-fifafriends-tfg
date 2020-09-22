import React, { useEffect, useContext } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { DashboardPage } from "./views/Dashboard";
import { LeaguePage } from "./views/League";
import { MarketPage } from "./views/Market";
import { TeamView } from "./views/Team";
import { Live } from "./views/Live";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import { TeamsContext } from "./context/TeamsContext";

export const AuthenticatedApp = () => {
  const { token, setUser } = useContext(AuthContext);
  const { setTeams } = useContext(TeamsContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTeams(response.data);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/user-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/competitions">
          <LeaguePage />
        </Route>
        <Route path="/market">
          <MarketPage />
        </Route>
        <Route path="/teams/:team">
          <TeamView />
        </Route>
        <Route path="/live">
          <Live />
        </Route>
      </Switch>
    </HashRouter>
  );
};
