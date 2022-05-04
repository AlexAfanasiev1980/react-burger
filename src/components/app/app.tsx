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
import { ADD_ITEM, DELETE_ITEM, REPLACE_ITEM } from '../../services/actions/actions';
import { ingredientsUrl } from '../../services/actions/index';
import { RootState } from '../../services/reducers';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  const selectCards = useSelector((store:RootState) => {
    return store.ingredient.selectedIngredients
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

  const openModalOrder = () => {
    const cardsId = cards.map((card:Card) => card._id);
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
    // setCurrentIngredient({...currentIngredient, isIngredient: false, dataCard: {}});
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

const handleDrop = (item:any) => {
  const element = selectCards.filter((element:Card) => element.type === 'bun');
  const typeItem = cards.filter((element:Card) => element._id === item.id)[0].type;
  if (element.length !== 0 &&  typeItem === 'bun') {
    dispatch({
      type: REPLACE_ITEM,
      payload: cards.filter((element:Card) => element._id === item.id)
    });
  } else {
    dispatch({
      type: ADD_ITEM,
      payload: cards.filter((element:Card) => element._id === item.id)
    });
  }
};

const deleteItem = (index:any) => {
  dispatch({
    type: DELETE_ITEM,
    payload: selectCards.filter((element:Card, indexElement:number) => indexElement !== index)
  });
}

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styleMain.main}>
            <BurgerIngredients onClick={openModalIngredients}/>
            <BurgerConstructor 
              onClick={openModalOrder} 
              onDropHandler={handleDrop} 
              onDeleteHandler={deleteItem}
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