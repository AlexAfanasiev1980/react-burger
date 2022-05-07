import React, { useState } from 'react';
import styleMain from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { VIEWED_INGREDIENT } from '../../services/actions/index';
import { CLEAR_INGREDIENTS } from '../../services/actions/actions';
import { ingredientsUrl } from '../../services/actions/index';
import { RootState } from '../../services/reducers';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { checkResponse } from '../../services/actions/index';
import { Card } from '../../utils/types';

function App() {

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({
    isIngredient: false,
  });
  const [numOrder, setNumOrder] = useState(0);
  const cards = useSelector((store:RootState) => {
    return store.ingredient.baseIngredients
  });

  const viewIngredient = useSelector((store:RootState) => {
    return store.ingredient.viewIngredient
  });

  const openModalIngredients = (card: Card) => {
    dispatch({
      type: VIEWED_INGREDIENT,
      payload: card
    })
    setCurrentIngredient({...currentIngredient, isIngredient: true});
    handleOpenModal();
  }

    function openModalOrder(selectCards:any) {
      return function(dispatch:any) {
      const cardsId = selectCards.map((card:Card) => card._id);
      const cardsBun = selectCards.filter((card:Card) => card.type === 'bun');
      if (cardsId.length !==0 && cardsBun.length !== 0) {
      const params = {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "ingredients": cardsId
        })
      }
      fetch(`${ingredientsUrl}orders`, params)
      .then(checkResponse)
      .then(data => {
        const orderObject = data;
        setNumOrder(orderObject.order.number);
        handleOpenModal();
        clearIngredients();
      })
      .catch(err => {
        console.log(err);
      })
      } else if (cardsId.length === 0) {
        alert('Для отправки заказа выберите ингридиенты')
      } else if (cardsBun.length === 0) {
        alert('Для отправки заказа необходимо выбрать булку')
      }
    }
  }

  const openModal = (selectCards:any) =>
  {
    return dispatch(openModalOrder(selectCards))
  };

  const handleOpenModal = () => {
    setVisible(true);
  }

  const clearIngredients = () => {
    dispatch({
      type: CLEAR_INGREDIENTS
    });
  }

  const handleCloseModal = () => {
    setVisible(false);
    setCurrentIngredient({...currentIngredient, isIngredient: false});
    dispatch({
      type: VIEWED_INGREDIENT,
      payload: {}
    });
  }
  
  const modalOrder = (
    <Modal onClose={handleCloseModal} title=''> 
      <OrderDetails numOrder = {numOrder}/>
    </Modal>
);

const modalIngredient = (
  <Modal onClose={handleCloseModal} title={'Детали ингредиента'}> 
    <IngredientDetails data={viewIngredient}/>
  </Modal>
);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styleMain.main}>
            <BurgerIngredients onClick={openModalIngredients}/>
            <BurgerConstructor 
              onClick={openModal} 
            />
        </main>
      </DndProvider>
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