import React, { useState, useContext } from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import {Counter, Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { DataApiContext } from '../../services/dataApi';

interface Ingredient {
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

interface IngredientProps {
  onClick: (card:Ingredient) => void
  card: Ingredient
}

interface BurgerProps {
  onClick: (card:Ingredient) => void
}

function Tabs() {
  const [current, setCurrent] = useState('one')
  return (
    <div className={ingredientsStyles.tab}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

function Ingredient(props:IngredientProps) {
  const {onClick, card} = props;
  return (
    <li className={ingredientsStyles.list_item} onClick={() => onClick(card)}>
      <img src={card.image} alt="icon" className={`ml-4 mb-1 ${ingredientsStyles.image}`}/>
      <p className={`${ingredientsStyles.price_item}`}> 
      <span className={`mr-2 text_type_digits-default`}>{card.price}</span> 
      <CurrencyIcon type="primary" /> </p>
      <h3 className={`mt-1 text_type_main-small`}>{card.name}</h3>
      {(card.type === 'bun') &&
        <Counter count={1} size="default" />
      }
    </li>
  )
}

function BurgerIngredients(props:BurgerProps) {
    const dataCards = useContext(DataApiContext);
    const bun = dataCards.filter((card:Ingredient) => card.type==='bun');
    const sauce = dataCards.filter((card:Ingredient) => card.type==='sauce');
    const main = dataCards.filter((card:Ingredient) => card.type==='main');

    return (
      <section className={`${ingredientsStyles.ingredients} section-item`}>
        <h1 className={`mt-10 mb-5 text_type_main-large`}>Соберите бургер</h1>
        <Tabs />
        <div className={`mt-10 ${ingredientsStyles.menu}`}>
          <div>
            <h2 className={`${ingredientsStyles.menu_item} mb-6 text_type_main-medium`}>Булки</h2>
              <ul className={`${ingredientsStyles.list} ml-4 mb-10`}>
                {bun.map((card:Ingredient, index:number) => {
                  return (
                    <Ingredient onClick={props.onClick} card={card} key={card._id}/>
                  )
                })}
              </ul>
          </div>
          <div>
            <h2 className={`${ingredientsStyles.menu_item} mb-6 text_type_main-medium`}>Соусы</h2>
              <ul className={`${ingredientsStyles.list} ml-4 mb-10`}>
                {sauce.map((card:Ingredient, index:number) => {
                  return (
                    <Ingredient onClick={props.onClick} card={card} key={card._id}/>
                  ) 
                })}
              </ul>
          </div>
          <div>
            <h2 className={`${ingredientsStyles.menu_item} mb-6 text_type_main-medium`}>Начинки</h2>
              <ul className={`${ingredientsStyles.list} ml-4 mb-10`}>
                {main.map((card:Ingredient, index:number) => {
                  return (
                    <Ingredient onClick={props.onClick} card={card} key={card._id}/>
                  )
                })}
              </ul>
          </div>
        </div> 
      </section>
    );
  };

export default BurgerIngredients;