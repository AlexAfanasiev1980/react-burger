import React, { useState, useEffect, useReducer } from 'react';
import styleMain from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { COMPLETION_INGREDIENTS } from '../../services/actions/index';
import { DataApiContext } from '../../services/dataApi';
import { ReducerTypeData, StateTypeData } from '../burger-constructor/burger-constructor';

const ingredientsUrl = 'https://norma.nomoreparties.space/api/';

interface Card {
    calories?: number
    carbohydrates?: number
    fat?: number
    image?: string
    image_large?: string
    image_mobile?: string
    name?: string
    price?: number
    proteins?: number
    type?: string
    __v?: number
    _id?: string
}

const initialState = {
  cards: [],
  price: 0
}

function reducer(state: StateTypeData , action: ReducerTypeData) {
  switch (action.type) {
    case "plus":
      return {
        cards: action.card,
        price: action.price
      };
    default: 
    return state;
  }
}


function App() {
  const dispatch1 = useDispatch();
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });
  const [visible, setVisible] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({
    isIngredient: false,
    dataCard: {}
  });
  const [numOrder, setNumOrder] = useState(0);
  const [stateReducer, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    const getData = async() => {
      try {
      setState({ ...state, hasError: false, isLoading: true });
      const res = await fetch(`${ingredientsUrl}ingredients`);
      if(!res.ok) {
        throw new Error(`Fetching ${ingredientsUrl}ingredients failed.`);
      };
      const dataCards = await res.json();
      setState({ ...state, data: dataCards.data, isLoading: false });
      dispatch1({
        type: COMPLETION_INGREDIENTS,
        data: dataCards.data
      });
      } catch(e) {
        console.log(e); 
        setState({ ...state, isLoading: false });
      }
    }
    getData();
  }, []);

  const dataIngredients = useSelector((store:any) => 
    store.baseIngredients, shallowEqual);

    
    console.log(dataIngredients);
 

  const openModalIngredients = (card: Card) => {
    setCurrentIngredient({...currentIngredient, isIngredient: true, dataCard: card});
    handleOpenModal();
  }

  const openModalOrder = () => {
    const cardsId = stateReducer.cards.map((card:Card) => card._id);
    const params = {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json'
  },
      body: JSON.stringify({
        "ingredients": cardsId
      })
    }
    const getNumberOrder = async() => {
      try {
      const res = await fetch(`${ingredientsUrl}orders`, params);
      if(!res.ok) {
        throw new Error(`Fetching ${ingredientsUrl}orders failed.`);
      };
      const orderObject = await res.json();
      setNumOrder(orderObject.order.number);
      } catch(e) {
        console.log(e);
      }
    }
    getNumberOrder();
    handleOpenModal();
  }

  const handleOpenModal = () => {
    setVisible(true);
  }

  const handleCloseModal = () => {
    setVisible(false);
    setCurrentIngredient({...currentIngredient, isIngredient: false, dataCard: {}});
  }
  
  const modalOrder = (
    <Modal onClose={handleCloseModal} title=''> 
      <OrderDetails numOrder = {numOrder}/>
    </Modal>
);

const modalIngredient = (
  <Modal onClose={handleCloseModal} title={'Детали ингредиента'}> 
    <IngredientDetails data={currentIngredient.dataCard}/>
  </Modal>
);

  return (
    <>
      <AppHeader />
      <main className={styleMain.main}>
        <DataApiContext.Provider value = {state.data}>
          <BurgerIngredients onClick={openModalIngredients}/>
          <BurgerConstructor onClick={openModalOrder} state={stateReducer} dispatch={dispatch}/>
        </DataApiContext.Provider>
      </main>
      {visible && 
      !currentIngredient.isIngredient && 
      modalOrder}
      {visible && 
      currentIngredient.isIngredient && 
      modalIngredient}
    </>
  );
}

export default App;