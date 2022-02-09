import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styleModal from './modal.module.css';
import Close from '../../images/Vector(Stroke).svg';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function Modal(props:any) {

    const modalRoot = document.getElementById('modal-root')!;
    const { onClick, ingredients, data } = props;

    useEffect(() => {
      window.addEventListener('keydown', handleEscClose);
   
      return () => {
        window.addEventListener('keydown', handleEscClose);
      }
    }, []);

    const handleEscClose = (e:any) => {
      if (e.key === 'Escape') {
        props.onClick();
    };
  }

    return ReactDOM.createPortal(
      ( 
        <>
          <div className={styleModal.modal}>
            <div className={styleModal.header}>
              <p className='text text_type_main-large'>
                {props.ingredients && 'Детали ингредиента'}
              </p>
              <button className={`${styleModal.buttonClose}`} onClick={onClick}>
                <img src={Close} alt="button" />
              </button>
            </div>
            <div className={styleModal.contentContainer}>
              {!ingredients &&
              <OrderDetails />}
              {ingredients &&
              <IngredientDetails data={data}/>}
            </div>
            
          </div>
          <ModalOverlay onClick={onClick}/>
        </>
      ), 
        modalRoot
    );
  
  } 
