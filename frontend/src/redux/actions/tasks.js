import axios from "axios";

import { tokenConfig } from "./user";
import proxy from "../../lib/proxy";
import { createMessageAlert, createErrorAlert } from "./alert";

export const getTasks = (page, group, course) => (dispatch) => {
  dispatch({ type: "SET_LOADING", payload: true });
  axios
    .get(proxy(`/api/tasks?p=${page}&by=${group}&order=${course}`))
    .then(({ data }) => {
      dispatch({
        type: "GET_TASKS",
        payload: data,
      });
    });
};

export const addTask = (data) => (dispatch) => {
  axios
    .post(proxy("/api/tasks"), data)
    .then((res) => {
      dispatch({ type: "ADD_TASK", payload: res });
      dispatch(createMessageAlert("Task was added successfully!"));
    })
    .catch((err) => {
      dispatch(createErrorAlert(err.response.data));
    });
};

export const editTask = (data) => (dispatch, getState) => {
  axios
    .patch(proxy("/api/tasks"), data, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "UPDATE_TASK", payload: res.data });
      dispatch(createMessageAlert("Task was edited successfully!"));
    })
    .catch((err) => {
      dispatch(createErrorAlert(err.response.data));
    });
};

export const setEditActive = (state) => (dispatch) => {
  dispatch({ type: "EDIT_ACTIVE", payload: state });
};
