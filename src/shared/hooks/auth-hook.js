import { useState, useCallback, useEffect } from "react";

let logoutTimer;

//THis is a custom hook that handles the authentication
export const useAuth = () => {
  const [token, SetToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, SetUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    SetToken(token);
    SetUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 10); //expires in 10 minutes
    setTokenExpirationDate(tokenExpirationDate);
    //Write the token in local storage
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    SetToken(null);
    setTokenExpirationDate(null);
    SetUserId(null);
    localStorage.removeItem("userData");
  }, []);

  //This use effect manages auto logout when token expires
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  //This logs the user in if the token hasnt expired
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]); // use effect has dependancy login but login function has useCallback so it will only run once

  return { token, login, logout, userId };
};
