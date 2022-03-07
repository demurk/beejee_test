const initialState = {
  items: {},
  isLoading: true,
  totalPages: 1,
};

const tasks = (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
    case "GET_TASKS": {
      const newTasks = {};
      data.results.forEach((element) => {
        newTasks[element.id] = element;
      });

      return {
        items: newTasks,
        isLoading: false,
        totalPages: data.total_pages,
      };
    }

    case "ADD_TASK": {
      return {
        ...state,
      };
    }

    case "UPDATE_TASK": {
      const newTasks = {};
      return {};
    }

    case "SET_LOADING": {
      return {
        ...state,
        isLoading: data,
      };
    }

    default:
      return state;
  }
};

export default tasks;
