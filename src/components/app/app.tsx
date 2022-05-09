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
import { MODAL_VISIBLE, CLOSE_MODAL } from '../../services/actions/actions';
import { sendOrder } from '../../services/actions/actions';
import { RootState } from '../../services/reducers';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Ingredient } from '../../utils/types';

function App() {

  const dispatch = useDispatch();
  const [currentIngredient, setCurrentIngredient] = useState({
    isIngredient: false,
  });

  const { viewIngredient, modalVisible, numOrder } = useSelector((store:RootState) => {
    return store.ingredient
  });

  const openModalIngredients = (card: Ingredient) => {
    dispatch({
      type: VIEWED_INGREDIENT,
      payload: card
    })
    setCurrentIngredient({...currentIngredient, isIngredient: true});
    dispatch({
      type: MODAL_VISIBLE
    });
  }

  const openModal = (selectCards:any) =>
  {
    return dispatch(sendOrder(selectCards))
  };

  const handleCloseModal = () => {
    dispatch({
      type: CLOSE_MODAL
    });
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
      {modalVisible && 
      !currentIngredient.isIngredient && 
      modalOrder}
      {modalVisible && 
      currentIngredient.isIngredient && 
      modalIngredient}
    </>
  );
}

export default App;