import React from 'react';
import styleOrder from './order-details.module.css';
import Gif from '../../images/done1.svg';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface Order {
  numOrder: number
}

export default function OrderDetails(props:Order) {
  return (
    <>
      <h2 className={`${styleOrder.numberOrder} mt-4 mb-8 text text_type_digits-large`}>{props.numOrder}</h2>
      <p className={`${styleOrder.text} text text_type_main-medium`}>идентификатор заказа</p>
      <div className={`${styleOrder.icon}`}>
        <img src={Gif} alt="icon" className={`mt-15 mb-15`}/>
      </div>
      <p className={`${styleOrder.text} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${styleOrder.bottomText} text text_type_main-default mb-30`}>Дождитесь готовности на орбитальной станции</p>
    </>  
  )
} 