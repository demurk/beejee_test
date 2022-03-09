import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { login, setAuthActive } from "../redux/actions/user";

import "../styles/modal.scss";

const AuthModal = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authHandler = () => {
    dispatch(login({ username, password }));
  };

  return (
    <div className="modal-main">
      <div className="modal-content">
        <div className="modal-fields">
          <div>Username</div>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="text-field modal-username"
            placeholder="Your username.."
          />
          <div>Password</div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="text-field modal-password"
            placeholder="Your password.."
            type="password"
          />
        </div>
        <div className="modal-buttons">
          <button
            className="modal-cancel"
            onClick={() => dispatch(setAuthActive(false))}
          >
            Cancel
          </button>
          <button className="modal-login" onClick={() => authHandler()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
