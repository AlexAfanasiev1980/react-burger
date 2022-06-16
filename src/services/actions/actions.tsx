import { checkResponse } from './index';
import { Ingredient } from '../../utils/types';
import { baseUrl } from '../api';
import { getCookie } from '../utils';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const REPLACE_ITEM = 'REPLACE_ITEM';
export const MOVE_CARD = 'MOVE_CARD';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';
export const MODAL_VISIBLE = 'MODAL_VISIBLE';
export const SET_ORDER = 'SET_ORDER';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const sendOrder = (selectCards:any) => {
  return function(dispatch:any) {
    const cardsId = selectCards.map((card:Ingredient) => card._id);
    const cardsBun = selectCards.filter((card:Ingredient) => card.type === 'bun');
    const token:any = getCookie('token');
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
    console.log(params);
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