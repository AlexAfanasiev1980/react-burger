import React from 'react';
import logo from './logo.svg';
import styleMain from './app.module.css';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-order/burger-constructor';
import data from '../../utils/data';

function App() {
  return (
    <>
      <Header />
      <main className={styleMain.main}>
        <BurgerIngredients dataCard={data} />
        <BurgerConstructor dataCard={data} />
      </main>
    </>
  );
}


export default App;
