import axios from "axios";

import proxy from "../../lib/proxy";
import { createMessageAlert, createErrorAlert } from "./alert";

export const login = (data) => (dispatch) => {
  axios
    .post(proxy("/api/auth/login"), data)
    .then((res) => {
      dispatch({ type: "AUTH_SUCCESS", payload: res.data });
      dispatch(createMessageAlert("Login successfull!"));
    })
    .catch((err) => {
      dispatch(createErrorAlert(err.response.data));
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post(proxy("/api/auth/logout"), null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "LOGOUT_SUCCESS" });
      dispatch(createMessageAlert("Logout successfull!"));
    })
    .catch((err) => {
      dispatch(createErrorAlert(err.response.data));
    });
};

export const setAuthActive = (state) => (dispatch) => {
  dispatch({ type: "SET_AUTH_WINDOW", payload: state });
};

export const tokenConfig = (getState) => {
  const token = getState().user.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
