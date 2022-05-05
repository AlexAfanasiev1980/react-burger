import React, { useEffect, useCallback, useRef } from 'react';
import orderStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Subtract from '../../images/Subtract.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { PRICE } from '../../services/actions/index';
import { MOVE_CARD } from '../../services/actions/actions';
import { useDrop, useDrag } from "react-dnd";

interface Ingredient {
  calories?: number
  carbohydrates?: number
  fat?: number
  image?: string
  image_large: string
  image_mobile?: string
  name: string
  price: number
  proteins?: number
  type?: string
  __v?: number
  _id?: string
}

interface BurgerConstructorProps {
  onClick: () => void,
  onDropHandler: (itemId:string) => void
  onDeleteHandler: (index:number) => void
}

interface BurgerItemProps {
  dataCard: Ingredient
  typeMean: "top" | "bottom" | undefined
  isLocked?: boolean
  handleClose?: (() => void)| undefined
}

export type ReducerTypeData = {
  type: string
  card: Ingredient[]
  price: number
}

export interface StateTypeData {
  cards: Ingredient[]
  price: number
}

function BurgerItem(props:BurgerItemProps) {
  return (
      <ConstructorElement
        type={props.typeMean}
        isLocked={props.isLocked}
        text={props.dataCard.name}
        price={props.dataCard.price}
        handleClose={props.handleClose}
        thumbnail={props.dataCard.image_large}
      /> 
  )
}

const IngredientCard = (props:any) => {
  const {card, index, onDeleteHandler, moveCard} = props;
  const id = card._id;
  let locked;

  const ref = useRef<HTMLLIElement>(null);

  const [, drag] = useDrag({
    type: "constructor",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ handlerId }, drop] = useDrop({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item:any, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref));

  return (
    <li 
      className={orderStyles.list_item}
      id={`${card._id}${index}`} 
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <BurgerItem 
        dataCard={card} 
        typeMean={undefined} 
        isLocked={locked} 
        handleClose={()=>onDeleteHandler(index)}/>
    </li>
  )     
}

function BurgerConstructor(props:BurgerConstructorProps) {
  
  const { onClick, onDropHandler, onDeleteHandler } = props;
  let sum=0;
  let cardData:Ingredient[] = [];
  const { selectedIngredients, price } = useSelector((store:RootState) => {
    return {...store.ingredient}
  });
  const dispatch = useDispatch();
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item:any) {
      onDropHandler(item);
    },
  });

  useEffect (() => {
    const setState = () => {
      selectedIngredients.forEach((card:Ingredient) => {
      if (card.type === 'bun') {
         cardData = [...cardData, card, card];
         sum += card.price*2;
      } else {
        cardData = [...cardData, card];
        sum = sum + card.price;
      }
    })
    }
    setState(); 
    dispatch({type: PRICE, payload: sum});
  }, [selectedIngredients]);
  
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    let dragCard = selectedIngredients[dragIndex];
    selectedIngredients.splice(dragIndex, 1);
    selectedIngredients.splice(hoverIndex, 0, dragCard)
    dispatch({
      type: MOVE_CARD,
      payload: selectedIngredients
    })
  }, [selectedIngredients])
  
  
  const [bun] = selectedIngredients.filter((card:Ingredient) => card.type === 'bun');

    return (
      <section className={`ml-10 ${orderStyles.order}`} ref={dropTarget}>
        <div className={`mt-25`}>
          <ul className={`${orderStyles.list_locked} pl-4`}>
         { bun &&
            <li className={orderStyles.list_item} key={bun._id}>
              <BurgerItem 
                dataCard={{...bun, name: `${bun.name} (верх)`}} 
                typeMean='top' isLocked={true}/>
            </li>      
         }  
          </ul>
          <ul className={`${orderStyles.list_onlocked} pl-4`}>
            {selectedIngredients.map((card: Ingredient, index:number, arr:Ingredient[]) => {
              if (card.type !== 'bun') {
                return (
                <IngredientCard 
                  card={card} 
                  index={index} 
                  key={`${card._id}${index}`} 
                  onDeleteHandler={onDeleteHandler}
                  moveCard={moveCard}
                />
                )
              }       
            })}
          </ul>
          <ul className={`${orderStyles.list_locked} pl-4`}>
          {bun &&
            <li className={orderStyles.list_item} key={bun._id}>
              <BurgerItem 
                dataCard={{...bun, name: `${bun.name} (низ)`}} 
                typeMean='bottom' isLocked={true} />
            </li>   
          }
          </ul>
          <div className={`mt-10 mr-4 ${orderStyles.accept_block}`}>
            <div className={`mr-10 ${orderStyles.sum_block}`}>
              <p className={`mr-2 text text_type_digits-medium`}>{price}</p>
              <img src={Subtract} alt="icon" className={orderStyles.icon} />
            </div>
            <Button type="primary" size="medium" onClick={()=>onClick()}>
              Оформить заказ
            </Button>
          </div>
        </div>
        
      </section>
      
    );
    
  }

export default BurgerConstructor;