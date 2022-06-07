import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as React from 'react'
import styleModal from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface ModalProps {
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal(props:ModalProps) {
    const modalRoot = document.getElementById('modals')!;
    const { onClose, title } = props;
    console.log(title)
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
          <div className={styleModal.modal_container}>
            <div className={styleModal.modal}>
              <div className={styleModal.header}>
                <p className='text text_type_main-large'>
                  {props.title}
                </p>
                <button className={`${styleModal.buttonClose}`} onClick={onClose}>
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