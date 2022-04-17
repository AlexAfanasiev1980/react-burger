import React, { useContext, useEffect } from 'react';
import orderStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Subtract from '../../images/Subtract.svg';
import { DataApiContext } from '../../services/dataApi';

interface Ingredient {
  calories?: number
  carbohydrates?: number
  fat?: number
  image?: string
  image_large: string
  image_mobile?: string
  name: string
  price: number
  proteins?: number
  type?: string
  __v?: number
  _id?: string
}

interface BurgerConstructorProps {
  onClick: () => void
  state: {
    cards: Ingredient[],
    price: number
  }
  dispatch: any
}

interface BurgerItemProps {
  dataCard: Ingredient
  typeMean: "top" | "bottom" | undefined
  isLocked?: boolean
}

export type ReducerTypeData = {
  type: string
  card: Ingredient[]
  price: number
}

export interface StateTypeData {
  cards: Ingredient[]
  price: number
}

function BurgerItem(props:BurgerItemProps) {
  return (
      <ConstructorElement
        type={props.typeMean}
        isLocked={props.isLocked}
        text={props.dataCard.name}
        price={props.dataCard.price}
        thumbnail={props.dataCard.image_large}
      /> 
  )
}

function BurgerConstructor(props:BurgerConstructorProps) {
  
  const {onClick, state, dispatch} = props;
  let sum=0;
  let cardData:Ingredient[] = [];
  const dataCards = useContext(DataApiContext);
  

  useEffect (() => {
    const setState = () => {
    dataCards.forEach((card:Ingredient) => {
      if (card.type === 'bun' && card._id === '60d3b41abdacab0026a733c6') {
         cardData = [...cardData, card, card];
         sum += card.price*2;
      } else {
        cardData = [...cardData, card];
        sum = sum + card.price;
      }
    })
    }
    setState(); 
    dispatch({type: "plus", card: cardData, price: sum});
  }, [dataCards]);
  
  const [bun] = state.cards.filter((card:Ingredient) => card._id === '60d3b41abdacab0026a733c6');
  
    return (
      <section className={`ml-10 ${orderStyles.order}`}>
        <div className={`mt-25`}>
          <ul className={`${orderStyles.list_locked} pl-4`}>
         { bun &&
            <li className={orderStyles.list_item} key={bun._id}>
              <BurgerItem dataCard={{...bun, name: `${bun.name} (верх)`}} typeMean='top' isLocked={true} />
            </li>      
         }  
          </ul>
          <ul className={`${orderStyles.list_onlocked} pl-4`}>
            {dataCards.map((card: Ingredient, index:number, arr:Ingredient[]) => {
              let locked;
              if (card.type !== 'bun') {
                return (
                  <li className={orderStyles.list_item} key={card._id}>
                    <DragIcon type="primary" />
                    <BurgerItem dataCard={card} typeMean={undefined} isLocked={locked}/>
                  </li>
                )     
              }       
            })}
          </ul>
          <ul className={`${orderStyles.list_locked} pl-4`}>
          {bun &&
            <li className={orderStyles.list_item} key={bun._id}>
              <BurgerItem dataCard={{...bun, name: `${bun.name} (низ)`}} typeMean='bottom' isLocked={true} />
            </li>   
          }
          </ul>
          <div className={`mt-10 mr-4 ${orderStyles.accept_block}`}>
            <div className={`mr-10 ${orderStyles.sum_block}`}>
              <p className={`mr-2 text text_type_digits-medium`}>{state.price}</p>
              <img src={Subtract} alt="icon" className={orderStyles.icon} />
            </div>
            <Button type="primary" size="medium" onClick={()=>onClick()}>
              Оформить заказ
            </Button>
          </div>
        </div>
        
      </section>
      
    );
    
  }

export default BurgerConstructor;