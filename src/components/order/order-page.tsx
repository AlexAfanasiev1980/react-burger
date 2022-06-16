import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../services/reducers";
import { useParams, useRouteMatch } from "react-router-dom";
import style from "./order.module.css";
import {
  CloseIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IngredientProps {
  title: string;
  onClose: () => void;
}

interface IdDate {
  id: string;
}

function OrderIngredient(props: any) {
  const { ingredient, cards } = props;

  const card = cards.find((card: any) => {
    return card._id === ingredient._id;
  });

  return (
    <>
      {card && (
        <li className={style.item}>
          <div className={style.imageContainer}>
            <div className={style.image}>
              <img src={`${card.image_mobile}`} alt="" />
            </div>
            <p
              className={`${style.name} ml-4 mr-4 text text_type_main-default`}
            >
              {card.name}
            </p>
          </div>
          <p className={`${style.priceItem}`}>
            <span className={`mr-2 text_type_digits-default`}>
              {ingredient.count}&times;{card.price}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </li>
      )}
    </>
  );
}

export default function OrderPage(props: IngredientProps) {
  const id: IdDate = useParams();
  const { path } = useRouteMatch();
  let orders;
  if (path === '/profile/orders/:id') {
    console.log(path)
    orders = useSelector((store: RootState) => {
      return store.order.messagesUser.orders;
    });
  } else {
    orders = useSelector((store: RootState) => {
      return store.order.messages.orders;
    });
  }

  const cards = useSelector((store: RootState) => {
    return store.ingredient.baseIngredients;
  });
  let sum = 0;
  let color;
  let arr: any = [];
  let order: any;
  let day = '';
  const now = new Date();
  const today = now.setHours(23, 59, 59, 999).valueOf();

  if (orders) {
    order = orders.find((el: any) => el._id === id.id);
    if (order) {
      const otherDay = new Date(order.createdAt);
    const other = otherDay.valueOf();
    sum = order.ingredients.reduce((acc: number, el: any) => {
      const data = cards.find((item: any) => item._id === el);
      if (data) {
        const price = data.price;
        return acc + price;
      }
      return acc;
    }, 0);
    
    const num = (today-other)/86400000;
    if (num <= 1) {
      day = 'Сегодня, ' + otherDay.getHours() + ':' + otherDay.getMinutes() + ' i-GMT+' + -now.getTimezoneOffset()/60;
    } else if (num <= 2) {
      day = 'Вчера, ' + otherDay.getHours() + ':' + otherDay.getMinutes() + ' i-GMT+' + -now.getTimezoneOffset()/60;
    } else if (num <= 3) {
      day = 'Позавчера, ' + otherDay.getHours() + ':' + otherDay.getMinutes() + ' i-GMT+' + -now.getTimezoneOffset()/60;
    } else {
      if (num <=4 || (num%10>=1 && num%10<=1)) {
      day = `${num} дня назад, ` + otherDay.getHours() + ':' + otherDay.getMinutes() + ' i-GMT+' + -now.getTimezoneOffset()/60;
    } else {
      day = `${num} дней назад, ` + otherDay.getHours() + ':' + otherDay.getMinutes() + ' i-GMT+' + -now.getTimezoneOffset()/60;
    }
    }

    color = {
      color: "#F2F2F3",
    };
    order.status === "Выполнен"
      ? (color.color = "#00CCCC")
      : order.status === "Отменен"
      ? (color.color = "#b50000")
      : null;
    const uniqueId = [...new Set(order.ingredients)];

    arr = uniqueId.map((id: any, index: number) => {
      let count = order.ingredients.filter((el: any) => el === id).length;
      return {
        _id: id,
        count: count,
      };
    });
  }

    
  }




  return (
    <>
      {order && (
        <div className={style.container}>
          <div className={style.wrapperContent}>
            <p className={`${style.orderNumber} text text_type_digits-default`}>{`#${order.number}`}</p>
            <h2 className="text text_type_main-medium mt-10">{order.name}</h2>
            <p className="text text_type_main-default mt-3" style={color}>
              {order.status}
            </p>
            <h3 className="text text_type_main-medium mt-15">Состав:</h3>
            <ul className={style.list}>
              {order.ingredients &&
                arr.map((ingredient: any, index: number) => {
                  return (
                    <OrderIngredient
                      ingredient={ingredient}
                      key={index}
                      cards={cards}
                    />
                  );
                })}
            </ul>
            <div className={`${style.footer}`}>
              <p className={`${style.date} text text_type_main-default`}>
                {day}
              </p>
              <p className={`${style.priceItem}`}>
                <span className={`mr-2 text_type_digits-default`}>{sum}</span>
                <CurrencyIcon type="primary" />
              </p>
            </div> 
          </div>
        </div>
      )}
    </>
  );
}
