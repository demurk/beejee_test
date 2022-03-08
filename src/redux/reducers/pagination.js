const initialState = {
  currentPage: 1,
};

const pagination = (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
    case "CHANGE_PAGE": {
      return {
        currentPage: data,
      };
    }

    default:
      return state;
  }
};

export default pagination;
