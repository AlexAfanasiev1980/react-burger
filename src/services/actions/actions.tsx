import { checkResponse } from './index';
import { Ingredient } from '../../utils/types';
import { baseUrl } from '../api';
import { getCookie } from '../utils';
import { AppDispatch, AppThunk } from '../../utils/index';


export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const REPLACE_ITEM: 'REPLACE_ITEM' = 'REPLACE_ITEM';
export const MOVE_CARD: 'MOVE_CARD' = 'MOVE_CARD';
export const CLEAR_INGREDIENTS: 'CLEAR_INGREDIENTS' = 'CLEAR_INGREDIENTS';
export const MODAL_VISIBLE: 'MODAL_VISIBLE' = 'MODAL_VISIBLE';
export const SET_ORDER: 'SET_ORDER' = 'SET_ORDER';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

export interface IAddItemAction {
  readonly type: typeof ADD_ITEM;
  readonly payload: {
    card: Ingredient,
    uuid: string
  }
}

export interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM;
  readonly payload: Array<Ingredient>;
}

export interface IReplaceItemAction {
  readonly type: typeof REPLACE_ITEM;
  readonly payload: Array<Ingredient>;
}

export interface IMoveCardAction {
  readonly type: typeof MOVE_CARD;
  readonly payload: Array<Ingredient>;
}

export interface IClearIngredientsAction {
  readonly type: typeof CLEAR_INGREDIENTS;
}

export interface IModalVisibleAction {
  readonly type: typeof MODAL_VISIBLE;
}

export interface ISetOrderAction {
  readonly type: typeof SET_ORDER;
  readonly payload: number;
}

export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
}

export type TCostructorActions = 
| IAddItemAction
| IDeleteItemAction
| IReplaceItemAction
| IMoveCardAction
| IClearIngredientsAction
| IModalVisibleAction
| ISetOrderAction
| ICloseModalAction;

export const sendOrder: AppThunk = (selectCards:ReadonlyArray<Ingredient>) => {
  return function(dispatch: AppDispatch) {
    const cardsId = selectCards.map((card) => card._id);
    const cardsBun = selectCards.filter((card) => card.type === 'bun');
    const token: string | undefined = getCookie('token');
    if (cardsId.length !==0 && cardsBun.length !== 0) {
    const params = {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
       Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
      "ingredients": cardsId
      })
    }
    fetch(`http://norma.nomoreparties.space/api/orders`, params)
    .then(checkResponse)
    .then(data => {
      const orderObject = data;
      setNumOrder(orderObject.order.number);
      dispatch({
        type: MODAL_VISIBLE
      });
      dispatch({
        type: CLEAR_INGREDIENTS
      });
    })
    .catch(err => {
      console.log(err);
    })
    } else if (cardsId.length === 0) {
      alert('Для отправки заказа выберите ингридиенты')
    } else if (cardsBun.length === 0) {
      alert('Для отправки заказа необходимо выбрать булку')
    }

    const setNumOrder = (numOrder:number) => {
      dispatch({
        type: SET_ORDER,
        payload: numOrder
      });
    }
  }
}