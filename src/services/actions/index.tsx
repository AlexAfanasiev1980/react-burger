export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const COMPLETION_INGREDIENTS = 'COMPLETION_INGREDIENTS';
export const SELECTED_INGREDIENTS = 'SELECTED_INGREDIENTS';
export const VIEW_INGREDIENTS = 'VIEW_INGREDIENT';
export const PRICE = 'PRICE';
export const VIEWED_INGREDIENT = 'VIEWED_INGREDIENT';

export const ingredientsUrl = 'https://norma.nomoreparties.space/api/';

export function getItems() {
  return function(dispatch: any) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    fetch(`${ingredientsUrl}ingredients`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      const dataCards = data;
      dispatch({
        type: GET_ITEMS_SUCCESS,
        data: dataCards.data
      });
      // dispatch({
      //   type: SELECTED_INGREDIENTS, 
      //   data: dataCards.data
      // });
     })
    .catch(e => {
      console.log(e.type);
      dispatch({
        type: GET_ITEMS_FAILED,
        payload: e
      });
    }) 
  }
}