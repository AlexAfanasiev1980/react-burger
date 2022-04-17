import { COMPLETION_INGREDIENTS } from '../actions/index';

const initialState = {
  baseIngredients: [],

  selectedIngredients: [],

  viewIngredient: {},
  promoDiscount: 50,

  order: []
};

export const ingredientReducer = (state = initialState, action:any) => { 
  switch (action.type) {
    case COMPLETION_INGREDIENTS: {
      return {
        ...state,
        baseIngredients: action.data
      };
    }
    default: {
      return state;
    }
  }
};