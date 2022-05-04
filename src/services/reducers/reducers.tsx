import { SELECTED_INGREDIENTS, PRICE, VIEWED_INGREDIENT, GET_ITEMS_SUCCESS,
  GET_ITEMS_REQUEST, GET_ITEMS_FAILED } from '../actions/index';
  import { ADD_ITEM, DELETE_ITEM, REPLACE_ITEM, MOVE_CARD } from '../actions/actions';

const initialState = {
  baseIngredients: [],
  selectedIngredients: [],
  viewIngredient: {},
  isLoading: false,

  isError: '',
  order: {},
  price: 0
};

export const ingredientReducer = (state = initialState, action:any) => { 
  switch (action.type) {
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        baseIngredients: action.data,
        isLoading: false,
        isError: '',
      };
    }
    case SELECTED_INGREDIENTS: {
      return {
        ...state,
        selectedIngredients: action.data
      };
    }
    case PRICE: {
      return {
        ...state,
        price: action.payload
      };
    }
    case VIEWED_INGREDIENT: {
      return {
        ...state,
        viewIngredient: action.payload
      };
    }
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: action.payload
      };
    }
    case ADD_ITEM: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, ...action.payload]
      };
    }
    case REPLACE_ITEM: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients.filter(element => element['type'] !== 'bun'), ...action.payload]
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        selectedIngredients: action.payload
      };
    }
    case MOVE_CARD: {
      return {
        ...state,
        selectedIngredients: action.payload
      };
    }
    default: {
      return state;
    }
  }
};