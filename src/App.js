import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import CurrencyConvert from "./currency/pages/CurrencyConvert";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import NewCurrency from "./currency/pages/NewCurrency";
import UpdateCurrency from "./currency/pages/UpdateCurrency";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedin, SetIsLoggedin] = useState(false);

  const login = useCallback(() => {
    SetIsLoggedin(true);
  }, []);

  const logout = useCallback(() => {
    SetIsLoggedin(false);
  }, []);

  let routes;

  if (isLoggedin) {
    //if user IS logged in
    routes = (
      <Switch>
        <Route path="/" exact>
          <CurrencyConvert />
        </Route>
        <Route path="/currency/list" exact>
          {/* <NewCurrency /> */}
        </Route>
        <Route path="/currency/new" exact>
          <NewCurrency />
        </Route>
        <Route path="/currency/:currencyId">
          <UpdateCurrency />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = ( //if User is NOT logged in
      <Switch>
        <Route path="/" exact>
          <CurrencyConvert />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedin: isLoggedin, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
