import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import * as React from 'react'
import style from './modal-order.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { RootState } from '../../services/reducers';

interface IdDate {
  id: string;
}

interface ModalProps {
  onClose: () => void,
  title?: string,
  children: React.ReactNode
}

export default function ModalOrder(props:ModalProps) {
  const id: IdDate = useParams();
    const modalRoot = document.getElementById('modals')!;
    const orders = useSelector((store: RootState) => {
      return store.order.messages.orders;
    });
    let order;
    if (orders) {
      order = orders.find((el: any) => el._id === id.id);
    }

    const { onClose, title } = props;
    
    useEffect(() => {
      const handleEscClose = (e:any) => {
        if (e.key === 'Escape') {
          onClose();
        };
      }
            
      window.addEventListener('keydown', handleEscClose);
   
      return () => {
        window.removeEventListener('keydown', handleEscClose);
      }
    }, [onClose]);

    return ReactDOM.createPortal(
      ( 
        <>
          <div className={style.modal_container}>
            <div className={style.modal}>
              <div className={style.header}>
                <p className='text text_type_digits-default'>
                  {`#${order && order.number}`}
                </p>
                <button className={`${style.buttonClose}`} onClick={onClose}>
                  <CloseIcon type="primary" />
                </button>
              </div>
              {props.children}
            </div>
            <ModalOverlay onClick={onClose}/>
          </div>
        </>
      ), 
        modalRoot
    );
  
  }