import { createContext } from "react";

//This provides context to the page about the state of the user.
export const AuthContext = createContext({
  isLoggedin: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
