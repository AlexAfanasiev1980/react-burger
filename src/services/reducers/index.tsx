import { combineReducers } from 'redux';
import { ingredientReducer } from './reducers';


export const rootReducer = combineReducers({
  ingredient: ingredientReducer, 
});

export type RootState = ReturnType<typeof rootReducer>