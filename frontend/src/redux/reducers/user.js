const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isAdmin: false,
  authWindowActive: false,
};

const user = (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
    case "AUTH_SUCCESS": {
      localStorage.setItem("token", data.token);

      return {
        ...state,
        isAuthenticated: data.is_authenticated,
        isAdmin: data.is_superuser,
        authWindowActive: false,
        token: data.token,
      };
    }

    case "AUTH_FAILED": {
      // localStorage.removeItem("token");
      return { ...initialState, authWindowActive: true };
    }

    case "LOAD_USER_SUCCESSFULL": {
      return {
        ...state,
        isAuthenticated: data.is_authenticated,
        isAdmin: data.is_superuser,
      };
    }

    case "SET_AUTH_WINDOW": {
      return { ...state, authWindowActive: data };
    }

    case "LOGOUT_SUCCESS": {
      localStorage.removeItem("token");
      return initialState;
    }

    default:
      return state;
  }
};

export default user;
