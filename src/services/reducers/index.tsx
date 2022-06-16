import { combineReducers } from 'redux';
import { ingredientReducer } from './reducers';
import { userReducer } from './user-redusers';
import { wsReducer } from './wsReducer';


export const rootReducer = combineReducers({
  ingredient: ingredientReducer, 
  user: userReducer,
  order: wsReducer
});

export type RootState = ReturnType<typeof rootReducer>