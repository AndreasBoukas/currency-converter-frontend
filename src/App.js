import React, {Suspense} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";


import MainNavigation from "./shared/components/navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIELEMENTS/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const CurrencyConvert = React.lazy(() => import("./currency/pages/CurrencyConvert"))
const Currencies = React.lazy(() => import("./currency/pages/Currencies"))
const Auth = React.lazy(() => import("./user/pages/Auth"))
const NewCurrency = React.lazy(() => import("./currency/pages/NewCurrency"))
const UpdateCurrency = React.lazy(() => import("./currency/pages/UpdateCurrency"))


function App() {
  //the auth-hook has the authentication logic
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    //if user IS logged in
    routes = (
      <Switch>
        <Route path="/" exact>
          <CurrencyConvert />
        </Route>
        <Route path="/currency/list" exact>
          <Currencies />
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
        <Route path="/currency/list" exact>
          <Currencies />
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
      value={{
        isLoggedin: !!token, //if truthy return true
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main><Suspense fallback={<div className="center"><LoadingSpinner /></div>}>{routes}</Suspense></main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
