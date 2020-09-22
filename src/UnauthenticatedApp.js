import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";

import { Login } from './views/Login';
import { SignUp } from './views/SignUp';


export const UnauthenticatedApp = () => {
  return (
    <HashRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </HashRouter>
  )
}