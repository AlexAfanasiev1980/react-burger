import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../../utils/data';

function App() {
  return (
    <>
      <Header />
      <main>
        <BurgerIngredients dataCard={data}/>
      </main>
    </>
  );
}

export default App;
