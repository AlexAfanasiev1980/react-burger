export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';
export const COMPLETION_INGREDIENTS: 'COMPLETION_INGREDIENTS' = 'COMPLETION_INGREDIENTS';
export const PRICE: 'PRICE' = 'PRICE';
export const VIEWED_INGREDIENT: 'VIEWED_INGREDIENT' = 'VIEWED_INGREDIENT';
export const VIEWED_ORDER: 'VIEWED_ORDER' = 'VIEWED_ORDER';
import { baseUrl } from '../api';
import { Ingredient, IOrder } from '../../utils/types';
import { AppDispatch, AppThunk } from '../../utils/index';

export interface IGetItemsRequestAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
  data: Array<Ingredient>;
}

export interface IGetItemsFailedAction {
  readonly type: typeof GET_ITEMS_FAILED;
  readonly payload: string;
}

export interface ICompletionIngredientsAction {
  readonly type: typeof COMPLETION_INGREDIENTS;
}

export interface IPriceAction {
  readonly type: typeof PRICE;
  readonly payload: number;
}

export interface IViewedIngredientAction {
  readonly type: typeof VIEWED_INGREDIENT;
  readonly payload: Ingredient;
}

export interface IViewedOrderAction {
  readonly type: typeof VIEWED_ORDER;
  readonly payload: IOrder;
}

export type TCardsActions = 
| IGetItemsRequestAction
| IGetItemsSuccessAction
| IGetItemsFailedAction
| ICompletionIngredientsAction
| IPriceAction
| IViewedIngredientAction
| IViewedOrderAction;



export function checkResponse(res:Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const getItems:AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    fetch(`${baseUrl}ingredients`)
    .then(checkResponse)
    .then(data => {
      const dataCards = data;
      dispatch({
        type: GET_ITEMS_SUCCESS,
        data: dataCards.data
      });
     })
    .catch(e => {
      console.log(e);
      dispatch({
        type: GET_ITEMS_FAILED,
        payload: e
      });
    }) 
  }
}