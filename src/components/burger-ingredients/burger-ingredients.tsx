import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../services/reducers';
import { getItems } from '../../services/actions/index';
import { useDrag } from "react-dnd";
import { Ingredient, ILocation } from '../../utils/types';

interface IngredientProps {
  onClick: (card:Ingredient) => void
  card: Ingredient
  ingredients: Array<Ingredient>
}

interface BurgerProps {
  onClick: (card:Ingredient) => void
}

function Tabs(props: {current: string, setCurrent: React.Dispatch<React.SetStateAction<string>>}) {
  const {current, setCurrent} = props;
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
  const location:ILocation = useLocation();
  const {onClick, card, ingredients} = props;
  const id = card._id;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {id},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  
  
  let counter = ingredients.filter((element:Ingredient) => element._id === id).length;
  if (counter !== 0 && card['type'] === 'bun') {
    counter += counter;
  }

  return (
    <li 
      className={ingredientsStyles.list_item} 
      onClick={() => onClick(card)}  
      ref={dragRef}
    >
      <Link to={{
          pathname: `/ingredients/${card._id}`,
          state: {background: location}
      }}
      className={ingredientsStyles.link}>
        <img src={card.image} alt="icon" className={`ml-4 mb-1 ${ingredientsStyles.image}`}/>
        <p className={`${ingredientsStyles.price_item}`}> 
        <span className={`mr-2 text_type_digits-default`}>{card.price}</span> 
        <CurrencyIcon type="primary" /> </p>
        <h3 className={`mt-1 text_type_main-small`}>{card.name}</h3>
        {counter !== 0 && 
          <Counter count={counter} size="default" />
        }
      </Link>
    </li>
  );
}

const BurgerIngredients: FunctionComponent<BurgerProps> = (props) => {
    const [current, setCurrent] = useState('one');
    const refScroll = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const dataCards:Array<Ingredient> = useSelector((store:RootState) => {
      return store.ingredient.baseIngredients
    });
    const ingredients = useSelector((store:RootState) => {
      return store.ingredient.selectedIngredients
    });
    const isLoading = useSelector((store:RootState) => store.ingredient.isLoading);
    const bun = dataCards.filter((card:Ingredient) => card.type==='bun');
    const sauce = dataCards.filter((card:Ingredient) => card.type==='sauce');
    const main = dataCards.filter((card:Ingredient) => card.type==='main');

    const handleScroll = () => {
      let scrollDistance:number = 0;
      let sauceTop:number = 0;
      let mainTop:number = 0;
      if (refScroll && refScroll.current) {
        scrollDistance = refScroll.current.scrollTop;
      }
      if (sauceRef && sauceRef.current) {
        sauceTop = sauceRef.current.offsetTop;
      }
      if (mainRef && mainRef.current) {
        mainTop = mainRef.current.offsetTop;
      }
      if (scrollDistance < sauceTop) {
        setCurrent('one')
      } else if (scrollDistance > sauceTop && scrollDistance < mainTop) {
        setCurrent('two')
      } else if (scrollDistance > mainTop) {
        setCurrent('three')
      }
      
    }



    return (
      <section className={`${ingredientsStyles.ingredients} section-item`}>
        <h1 className={`mt-10 mb-5 text_type_main-large`}>Соберите бургер</h1>
        <Tabs current={current} setCurrent={setCurrent}/>
        {isLoading &&
        <h3>Загрузка...</h3>}
        {!isLoading &&
        <div className={`mt-10 ${ingredientsStyles.menu}`} ref={refScroll} onScroll={() => handleScroll()}>
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
          <div ref={sauceRef}>
            <h2 className={`${ingredientsStyles.menu_item} mb-6 text_type_main-medium`}>Соусы</h2>
              <ul className={`${ingredientsStyles.list} ml-4 mb-10`}>
                {sauce.map((card:Ingredient, index:number) => {
                  return (
                  
                      <IngredientItem onClick={props.onClick} card={card} key={card._id} ingredients={ingredients}/>
                    
                  ) 
                })}
              </ul>
          </div>
          <div ref={mainRef}>
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