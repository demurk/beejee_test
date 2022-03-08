const initialState = {
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  authWindowActive: false,
};

const user = (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
    case "AUTH_SUCCESS": {
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: data.is_superuser,
        authWindowActive: false,
        token: data.token,
      };
    }

    case "AUTH_FAILED": {
      return { ...initialState, authWindowActive: true };
    }

    case "SET_AUTH_WINDOW": {
      return { ...state, authWindowActive: data };
    }

    case "LOGOUT_SUCCESS": {
      return initialState;
    }

    default:
      return state;
  }
};

export default user;
