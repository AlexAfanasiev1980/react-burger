import { combineReducers } from 'redux';
import { ingredientReducer } from './reducers';
import { userReducer } from './user-redusers';


export const rootReducer = combineReducers({
  ingredient: ingredientReducer, 
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>