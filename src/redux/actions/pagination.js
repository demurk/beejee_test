export const changePage = (page) => (dispatch) => {
  dispatch({
    type: "CHANGE_PAGE",
    payload: page,
  });
};
