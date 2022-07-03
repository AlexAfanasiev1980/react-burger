import { PRICE, VIEWED_INGREDIENT, GET_ITEMS_SUCCESS,
  GET_ITEMS_REQUEST, GET_ITEMS_FAILED, VIEWED_ORDER } from '../actions/index';
import { 
    ADD_ITEM, 
    DELETE_ITEM, 
    REPLACE_ITEM, 
    MOVE_CARD, 
    CLEAR_INGREDIENTS, 
    MODAL_VISIBLE, 
    SET_ORDER,
    CLOSE_MODAL 
  } from '../actions/actions';
import { Ingredient, IOrder } from '../../utils/types';
import type { TCardsActions } from '../actions/index';
import type { TCostructorActions } from '../actions/actions';

  type TInitialState = {
    baseIngredients: Array<Ingredient>,
    selectedIngredients: Array<Ingredient>,
    viewIngredient: Ingredient,
    viewOrder: IOrder,
    isLoading: boolean,
    isError: string,
    order: IOrder,
    price: number,
    numOrder: number,
    modalVisible: boolean
  }

const initialState: TInitialState = {
  baseIngredients: [],
  selectedIngredients: [],
  viewIngredient: {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: 0,
    proteins: 0,
    type: '',
    __v: 0,
    _id: '',
    uuid: ''
  },
  viewOrder: {
    createdAt: '',
    ingredients: [''],
    name: '',
    number: 0,
    status: '',
    updatedAt: '',
    _id: ''
  },
  isLoading: false,
  isError: '',
  order: {
    createdAt: '',
    ingredients: [''],
    name: '',
    number: 0,
    status: '',
    updatedAt: '',
    _id: ''
  },
  price: 0,
  numOrder: 0,
  modalVisible: false
};

export const ingredientReducer = (state = initialState, action: TCardsActions | TCostructorActions): TInitialState => { 
  switch (action.type) {
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        baseIngredients: action.data,
        isLoading: false,
        isError: '',
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
      const item = {...action.payload.card, uuid: action.payload.uuid};
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, item]
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
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        selectedIngredients: []
      };
    }
    case MODAL_VISIBLE: {
      return {
        ...state,
        modalVisible: !state.modalVisible
      };
    }
    case SET_ORDER: {
      return {
        ...state,
        numOrder: action.payload
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modalVisible: false
      };
    }
      case VIEWED_ORDER: {
        return {
          ...state,
          viewOrder: action.payload
        };
      };
    default: {
      return state;
    }
  }
};