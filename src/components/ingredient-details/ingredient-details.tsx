import React, { useState, useEffect } from 'react';
import styleIngredient from './ingredient-details.module.css';

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
  }
}

export default function IngredientDetails(props:IngredientProps) {
const dataCard = props.data;

  return (
    <>
      <img src={dataCard.image_large} alt="image" className='mb-4' />
      <h2 className={`${styleIngredient.title} text text_type_main-large mb-8`}>{dataCard.name}</h2>
      <ul className={`${styleIngredient.nutritional_value} mb-15`}>
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
    </>  
  )
  
} 