import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAuthActive, logout } from "../redux/actions/user";

import "../styles/navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(({ user }) => user.isAuthenticated);

  return (
    <header>
      <div className="navbar">
        {isAuthenticated ? (
          <button className="logout" onClick={() => dispatch(logout())}>
            Logout
          </button>
        ) : (
          <button
            className="login"
            onClick={() => dispatch(setAuthActive(true))}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
