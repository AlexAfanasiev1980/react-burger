import { GET_USER_SUCCESS, UPDATE_USER_SUCCESS, LOGOUT_USER } from '../actions/user-actions';
import type { TUserActions } from '../actions/user-actions';


type TUserState = {
  user: {
    email: string,
    name: string,
    password: string
  }
}

const userState: TUserState = {
  user: {
    email: '',
    name: '',
    password: ''
  }
};

export const userReducer = (state = userState, action: TUserActions):TUserState  => { 
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