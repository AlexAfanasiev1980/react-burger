import React, { useState, useEffect } from 'react';
import styleMain from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const ingredientsUrl = 'https://norma.nomoreparties.space/api/';

interface FunctionProps {
  card: {
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
}

function App() {

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
      } catch(e) {
        console.log(e); 
        setState({ ...state, isLoading: false });
      }
    }
    getData();
  }, []);

  const openModalIngredients = (card:FunctionProps) => {
    
    setCurrentIngredient({...currentIngredient, isIngredient: true, dataCard: card});
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
    <Modal onClose={handleCloseModal} title={''}> 
      <OrderDetails/>
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
        <BurgerIngredients dataCard={state.data} onClick={openModalIngredients}/>
        <BurgerConstructor dataCard={state.data} onClick={handleOpenModal}/>
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
