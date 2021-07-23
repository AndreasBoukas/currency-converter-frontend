import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Convert
        </NavLink>
      </li>
      {auth.isLoggedin && ( //if is logged in then render Currency List button
        <li>
          <NavLink to="/currency/list">Currency List</NavLink>
        </li>
      )}
      {auth.isLoggedin && ( //if is logged in then render Add Currency button
        <li>
          <NavLink to="/currency/new">Add Currency</NavLink>
        </li>
      )}
      {!auth.isLoggedin && ( //if is not logged in render Sign in
        <li>
          <NavLink to="/auth">Sign in</NavLink>
        </li>
      )}
      {auth.isLoggedin && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
