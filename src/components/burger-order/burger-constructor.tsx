import React, { useState } from 'react';
import orderStyles from './burger-constructor.module.css';
import Box, {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import fonts from '@ya.praktikum/react-developer-burger-ui-components';
import { isPropertySignature } from 'typescript';
import points from '../../images/points.svg';
import Subtract from '../../images/Subtract.svg';
let sum = 0;

function BurgerItem(props:any, any: any) {
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

function BurgerConstructor(props:any) {

    return (
      <section className={`ml-10 ${orderStyles.order}`}>
        <div className={`mt-25`}>
          <ul className={`${orderStyles.list_locked} pl-4`}>
          {props.dataCard.map((card:any, index:any, arr:any) => {
              let type = 'top';
              let locked;
              if (card.type === 'bun') {
                locked = true;
                return (
                  <li className={orderStyles.list_item} key={card._id}>
                    <BurgerItem dataCard={{...card, name: `${card.name} (верх)`}} typeMean={type} isLocked={locked} />
                  </li>
                ) 
              }        
            })}
          </ul>
          <ul className={`${orderStyles.list_onlocked} pl-4`}>
            {props.dataCard.map((card:any, index:any, arr:any) => {
              let type = '';
              let locked;
              sum = sum + card.price;
              if (card.type !== 'bun') {
                return (
                  <li className={orderStyles.list_item} key={card._id}>
                    <img src={points} alt="points" className={`mr-2`}/>
                    <BurgerItem dataCard={card} typeMean={type} isLocked={locked}/>
                  </li>
                )     
              }
                 
                     
            })}
          </ul>
          <ul className={`${orderStyles.list_locked} pl-4`}>
          {props.dataCard.map((card:any, index:any, arr:any) => {
              let type = '';
              let locked;
              type='bottom';
              if (card.type === 'bun') {
                locked = true;
                locked = true;
                return (
                  <li className={orderStyles.list_item} key={card._id}>
                    <BurgerItem dataCard={{...card, name: `${card.name} (низ)`}} typeMean={type} isLocked={locked} />
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