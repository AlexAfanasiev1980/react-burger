import React, { useState, useRef } from 'react';
import styleIngredient from '../components/ingredient-details/ingredient-details.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './index.module.css';

export function IngredientsPage() {
  const [valuePass, setValuePass] = useState('')
  const [valueName, setValueName] = useState('')
  const inputRefMail = useRef<HTMLInputElement>(null);


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Детали ингредиента</h1>
        <h2 className={`${styleIngredient.title} text text_type_main-large mb-8`}>1</h2>
        <ul className={`${styleIngredient.nutritional_value} mb-15`}>
          <li className={styleIngredient.list_item}>
            <p className='text text_type_main-default'>Калории, ккал</p>
            <p className='text text_type_digits-default'>1</p>
            </li>
          <li className={styleIngredient.list_item}>
            <p className='text text_type_main-default'>Белки, г</p>
            <p className='text text_type_digits-default'>1</p>
          </li>
          <li className={styleIngredient.list_item}>
            <p className='text text_type_main-default'>Жиры, г</p>
            <p className='text text_type_digits-default'>1</p>
          </li>
          <li className={styleIngredient.list_item}>
            <p className='text text_type_main-default'>Углеводы, г</p>
            <p className='text text_type_digits-default'>1</p>
          </li>
        </ul>
      </div>
    </div>
  );
}