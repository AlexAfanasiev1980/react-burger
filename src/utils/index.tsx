import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../services/store';
import { TCardsActions } from '../services/actions/index';
import { TCostructorActions } from '../services/actions/actions';
import { TUserActions } from '../services/actions/user-actions';
import { TConnectionActions } from '../services/action-types/wsActionTypes';
import type { RootState } from '../services/reducers/index';

type TApplicationActions = 
| TCardsActions
| TCostructorActions
| TUserActions
| TConnectionActions;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;