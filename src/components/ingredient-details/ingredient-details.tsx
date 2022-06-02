import React from 'react';
import styleIngredient from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IngredientProps {
  data: {
    calories?: number
    carbohydrates?: number
    fat?: number
    image?: string
    image_large?: string
    image_mobile?: string
    name?: string
    price?: number
    proteins?: number
    type?: string
    __v?: number
    _id?: string
  },
  title:string,
  onClose: () => void
}

export default function IngredientDetails(props:IngredientProps) {
const dataCard = props.data;

  return (

    <div className={styleIngredient.modalContainer}>
      <div className={styleIngredient.header}>
        <p className='text text_type_main-large'>
                  {props.title}
        </p>
        <button className={`${styleIngredient.buttonClose}`} onClick={props.onClose}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <img src={dataCard.image_large} alt="icon" className={`ml-30 ${styleIngredient.image}`} />
      <h2 className={`${styleIngredient.title} text text_type_main-large`}>{dataCard.name}</h2>
      <ul className={`${styleIngredient.nutritional_value}`}>
        <li className={styleIngredient.list_item}>
          <p className='text text_type_main-default'>Калории, ккал</p>
          <p className='text text_type_digits-default'>{dataCard.calories}</p>
          </li>
        <li className={styleIngredient.list_item}>
          <p className='text text_type_main-default'>Белки, г</p>
          <p className='text text_type_digits-default'>{dataCard.proteins}</p>
        </li>
        <li className={styleIngredient.list_item}>
          <p className='text text_type_main-default'>Жиры, г</p>
          <p className='text text_type_digits-default'>{dataCard.fat}</p>
        </li>
        <li className={styleIngredient.list_item}>
          <p className='text text_type_main-default'>Углеводы, г</p>
          <p className='text text_type_digits-default'>{dataCard.carbohydrates}</p>
        </li>
      </ul>
      </div>

  )
  
} 