import React, { useState, useEffect } from 'react';
import styleModal from './modal-overlay.module.css';

export default function ModalOverlay(props:any) {

  return (
    <div className={styleModal.modalOverlay} onClick={props.onClick}>
         
    </div>  
  )
  
} 