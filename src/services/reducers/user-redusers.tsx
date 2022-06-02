import { GET_USER_SUCCESS, UPDATE_USER_SUCCESS } from '../actions/user-actions';

const initialState = {
  user: {
    email: '',
    name: '',
    password: ''
  }
};

export const userReducer = (state = initialState, action:any) => { 
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
      console.log(action.payload);
      return {
        ...state,
        user: {...state.user,
          email: email,
          name: name,
          password: password
        }
      };
    }
    default: {
      return state;
    }
  }
};