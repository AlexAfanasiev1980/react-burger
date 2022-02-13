import React, { useState } from 'react';
import orderStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Subtract from '../../images/Subtract.svg';
let sum = 0;

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
  dataCard: Ingredient[]
  onClick: () => void
}

interface BurgerItemProps {
  dataCard: Ingredient
  typeMean: "top" | "bottom" | undefined
  isLocked?: boolean
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

    return (
      <section className={`ml-10 ${orderStyles.order}`}>
        <div className={`mt-25`}>
          <ul className={`${orderStyles.list_locked} pl-4`}>
          {props.dataCard.map((card: Ingredient, index: number, arr: Ingredient[]) => {
              let locked;
              if (card.type === 'bun') {
                locked = true;
                return (
                  <li className={orderStyles.list_item} key={card._id}>
                    <BurgerItem dataCard={{...card, name: `${card.name} (верх)`}} typeMean='top' isLocked={locked} />
                  </li>
                ) 
              }        
            })}
          </ul>
          <ul className={`${orderStyles.list_onlocked} pl-4`}>
            {props.dataCard.map((card: Ingredient, index:number, arr:Ingredient[]) => {
              let locked;
              sum = sum + card.price;
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
          {props.dataCard.map((card: Ingredient, index:number, arr:Ingredient[]) => {
              let locked;
              if (card.type === 'bun') {
                locked = true;
                locked = true;
                return (
                  <li className={orderStyles.list_item} key={card._id}>
                    <BurgerItem dataCard={{...card, name: `${card.name} (низ)`}} typeMean='bottom' isLocked={locked} />
                  </li>
                ) 
              }        
            })}
          </ul>
          <div className={`mt-10 mr-4 ${orderStyles.accept_block}`}>
            <div className={`mr-10 ${orderStyles.sum_block}`}>
              <p className={`mr-2 text text_type_digits-medium`}>{sum}</p>
              <img src={Subtract} alt="icon" className={orderStyles.icon} />
            </div>
            <Button type="primary" size="medium" onClick={props.onClick}>
              Оформить заказ
            </Button>
          </div>
        </div>
      </section>
    );
  }

export default BurgerConstructor;