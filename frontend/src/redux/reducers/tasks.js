const initialState = {
  items: [],
  isLoading: true,
  editWindowActive: false,
  addedNewTask: false,
  totalPages: 1,
};

const tasks = (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
    case "GET_TASKS": {
      return {
        ...state,
        items: data.results,
        isLoading: false,
        totalPages: data.total_pages,
        addedNewTask: false,
      };
    }

    case "ADD_TASK": {
      return {
        ...state,
        editWindowActive: false,
        addedNewTask: true,
      };
    }

    case "UPDATE_TASK": {
      const newTasks = [...state.items];
      newTasks.map((el, index) => {
        if (data.id === el.id) {
          newTasks[index] = data;
        }
      });

      return { ...state, items: newTasks, editWindowActive: false };
    }

    case "EDIT_ACTIVE": {
      return { ...state, editWindowActive: data };
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
