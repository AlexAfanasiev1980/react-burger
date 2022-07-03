import { combineReducers } from 'redux';
import { ingredientReducer } from './reducers';
import { userReducer } from './user-redusers';
import { wsReducer } from './wsReducer';
import { store } from '../store';




export const rootReducer = combineReducers({
  ingredient: ingredientReducer, 
  user: userReducer,
  order: wsReducer,
});

export type RootState = ReturnType<typeof store.getState>
