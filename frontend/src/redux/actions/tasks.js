import axios from "axios";

import proxy from "../../lib/proxy";

export const getTasks = (page, group, course) => (dispatch) => {
  dispatch({ type: "SET_LOADING", payload: true });

  axios
    .get(proxy(`/api/tasks?p=${page}&by=${group}&order=${course}`))
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: "GET_TASKS",
        payload: data,
      });
    });
};

export const addTask = (data) => (dispatch) => {
  axios.post(proxy("/api/tasks"), data).then((res) => {
    dispatch({ type: "ADD_TASK", payload: res });
  });
  // .catch((err) => {
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // });
};

export const editTask = (data) => (dispatch) => {
  axios.post(proxy("/api/tasks"), data).then((res) => {
    dispatch({});
  });
  // .catch((err) => {
  //   dispatch(returnErrors(err.response.data, err.response.status))
  // });
};
