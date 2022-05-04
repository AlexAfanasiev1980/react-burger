import React, { useState, useEffect, useCallback } from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import {Counter, Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { getItems } from '../../services/actions/index';
import { useDrag } from "react-dnd";

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
  ingredients: any
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

function IngredientItem(props:IngredientProps) {
  const {onClick, card, ingredients} = props;
  const id = card._id;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {id},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  
  let counter = ingredients.filter((element:any) => element._id === id).length;
  if (counter !== 0 && card['type'] === 'bun') {
    counter += counter;
  }

  return (
    <li className={ingredientsStyles.list_item} onClick={() => onClick(card)}  ref={dragRef}>
      <img src={card.image} alt="icon" className={`ml-4 mb-1 ${ingredientsStyles.image}`}/>
      <p className={`${ingredientsStyles.price_item}`}> 
      <span className={`mr-2 text_type_digits-default`}>{card.price}</span> 
      <CurrencyIcon type="primary" /> </p>
      <h3 className={`mt-1 text_type_main-small`}>{card.name}</h3>
      {counter !== 0 && 
        <Counter count={counter} size="default" />
      }
    </li>
  );
}

function BurgerIngredients(props:BurgerProps) {
    const dispatch = useDispatch();
    const dataCards = useSelector((store:RootState) => {
      return store.ingredient.baseIngredients
    });
    const ingredients = useSelector((store:RootState) => {
      return store.ingredient.selectedIngredients
    });
    const isLoading = useSelector((store:RootState) => store.ingredient.isLoading);
    const bun = dataCards.filter((card:Ingredient) => card.type==='bun');
    const sauce = dataCards.filter((card:Ingredient) => card.type==='sauce');
    const main = dataCards.filter((card:Ingredient) => card.type==='main');
    
    useEffect(() => {
      dispatch(getItems());
    }, [dispatch]);

    return (
      <section className={`${ingredientsStyles.ingredients} section-item`}>
        <h1 className={`mt-10 mb-5 text_type_main-large`}>Соберите бургер</h1>
        <Tabs />
        {isLoading &&
        <h3>Загрузка...</h3>}
        {!isLoading &&
        <div className={`mt-10 ${ingredientsStyles.menu}`}>
          <div>
            <h2 className={`${ingredientsStyles.menu_item} mb-6 text_type_main-medium`}>Булки</h2>
              <ul className={`${ingredientsStyles.list} ml-4 mb-10`}>
                {bun.map((card:Ingredient, index:number) => {
                  return (
                    <IngredientItem onClick={props.onClick} card={card} key={card._id} ingredients={ingredients}/>
                  )
                })}
              </ul>
          </div>
          <div>
            <h2 className={`${ingredientsStyles.menu_item} mb-6 text_type_main-medium`}>Соусы</h2>
              <ul className={`${ingredientsStyles.list} ml-4 mb-10`}>
                {sauce.map((card:Ingredient, index:number) => {
                  return (
                    <IngredientItem onClick={props.onClick} card={card} key={card._id} ingredients={ingredients}/>
                  ) 
                })}
              </ul>
          </div>
          <div>
            <h2 className={`${ingredientsStyles.menu_item} mb-6 text_type_main-medium`}>Начинки</h2>
              <ul className={`${ingredientsStyles.list} ml-4 mb-10`}>
                {main.map((card:Ingredient, index:number) => {
                  return (
                    <IngredientItem onClick={props.onClick} card={card} key={card._id} ingredients={ingredients}/>
                  )
                })}
              </ul>
          </div>
        </div> 
        }
      </section>
    );
  };

export default BurgerIngredients;