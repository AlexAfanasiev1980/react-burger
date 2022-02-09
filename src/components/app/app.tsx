import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import styleMain from './app.module.css';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-order/burger-constructor';
import Modal from '../modal/modal';

const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });
  const [visible, setVisible] = useState(false);
  const [ingredients, setIngredients] = useState({
    isIngredient: false,
    dataCard: {}
  });
  
  useEffect(() => {
    const getData = async() => {
      try {
      setState({ ...state, hasError: false, isLoading: true });
      const res = await fetch(ingredientsUrl);
      if(!res.ok) {
        throw new Error(`Fetching ${ingredientsUrl} failed.`);
      };
      const dataCards = await res.json();
      setState({ ...state, data: dataCards.data, isLoading: false });
      } catch(e) {
        console.log(e); 
      }
    }
    getData();
  }, []);

  const openModalIngredients = (card:any) => {
    
    setIngredients({...ingredients, isIngredient: true, dataCard: card});
    handleOpenModal();
  }

  const handleOpenModal = () => {
    setVisible(true);
  }

  const handleCloseModal = () => {
    setVisible(false);
    setIngredients({...ingredients, isIngredient: false, dataCard: {}});
  }
  
  const modal = (
    <Modal onClick={handleCloseModal} ingredients={ingredients.isIngredient} data={ingredients.dataCard}/> 
);

  return (
    <>
      <Header />
      <main className={styleMain.main}>
        <BurgerIngredients dataCard={state.data} onClick={openModalIngredients}/>
        <BurgerConstructor dataCard={state.data} onClick={handleOpenModal}/>
      </main>
      {visible && modal}
    </>
  );
}


export default App;
