import React, { useEffect } from 'react';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import styleIngredient from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/types';

interface IngredientProps {
  title:string,
  onClose: () => void
}

interface IdDate {
  id: string
}

export default function IngredientDetails(props:IngredientProps) {
const id:IdDate = useParams();
const dataCards = useSelector((store) => {
    return store.ingredient.baseIngredients
  });
const dataCard = dataCards.filter((card:Ingredient) => card._id === id.id)[0];

return (
    <>
    {dataCard && 
      <div className={styleIngredient.modalContainer}>
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
    }
    </>
        
        )
  
} 