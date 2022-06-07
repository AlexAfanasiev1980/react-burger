import { GET_USER_SUCCESS, UPDATE_USER_SUCCESS, LOGOUT_USER } from '../actions/user-actions';

const userState = {
  user: {
    email: '',
    name: '',
    password: ''
  }
};

export const userReducer = (state = userState, action:any) => { 
  switch (action.type) {
    case GET_USER_SUCCESS: {
      const { email, name, password } = action.payload;
      return {
        ...state,
        user: {...state.user,
          email: email,
          name: name,
          password: password
        }
      };
    }
    case UPDATE_USER_SUCCESS: {
      const { email, name, password } = action.payload;
      return {
        ...state,
        user: {...state.user,
          email: email,
          name: name,
          password: password
        }
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: {...state.user,
          email: '',
          name: '',
          password: ''
        }
      };
    }
    default: {
      return state;
    }
  }
};