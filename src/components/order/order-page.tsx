import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { useParams, useRouteMatch } from "react-router-dom";
import style from "./order.module.css";
import { getCookie } from '../../services/utils';
import {
  CloseIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/action-types';
import { Ingredient, IOrder } from "../../utils/types";


interface IngredientProps {
  title: string;
  onClose: () => void;
}

interface IdDate {
  id: string;
}

function OrderIngredient(props: {ingredient: {_id: string, count: number}, cards: Array<Ingredient>}) {
  const { ingredient, cards } = props;

  const card = cards.find((card: Ingredient) => {
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
  const dispatch = useDispatch();
  let orders = useSelector((store) => {
    return store.order.messages.orders;
  });
  const state = useSelector((store) => {
    return store.user
  });

  const cards = useSelector((store) => {
    return store.ingredient.baseIngredients;
  });
  let sum = 0;
  let color;
  let arr: {_id: string, count: number}[] = [];
  let order: IOrder | undefined;
  let day = "";
  const now = new Date();
  const today = now.setHours(23, 59, 59, 999).valueOf();

  if (orders) {
    order = orders.find((el: IOrder) => el._id === id.id);
    if (order) {
      const otherDay = new Date(order.createdAt);
      const other = otherDay.valueOf();
      sum = order.ingredients.reduce((acc: number, el: string) => {
        const data = cards.find((item: Ingredient) => item._id === el);
        if (data) {
          const price = data.price;
          return acc + price;
        }
        return acc;
      }, 0);

      const num = Math.floor((today - other) / 86400000);
      if (num <= 1) {
        day =
          "Сегодня, " +
          otherDay.getHours() +
          ":" +
          otherDay.getMinutes() +
          " i-GMT+" +
          -now.getTimezoneOffset() / 60;
      } else if (num <= 2) {
        day =
          "Вчера, " +
          otherDay.getHours() +
          ":" +
          otherDay.getMinutes() +
          " i-GMT+" +
          -now.getTimezoneOffset() / 60;
      } else if (num <= 3) {
        day =
          "Позавчера, " +
          otherDay.getHours() +
          ":" +
          otherDay.getMinutes() +
          " i-GMT+" +
          -now.getTimezoneOffset() / 60;
      } else {
        if (num <= 4 || (num % 10 >= 1 && num % 10 <= 1)) {
          day =
            `${num} дня назад, ` +
            otherDay.getHours() +
            ":" +
            otherDay.getMinutes() +
            " i-GMT+" +
            -now.getTimezoneOffset() / 60;
        } else {
          day =
            `${num} дней назад, ` +
            otherDay.getHours() +
            ":" +
            otherDay.getMinutes() +
            " i-GMT+" +
            -now.getTimezoneOffset() / 60;
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

      arr = uniqueId.map((id, index) => {
        let count: number = 0;
        if (order) {
          count = order.ingredients.filter((el: string) => el === id).length;
        }
        return {
          _id: id,
          count: count,
        };
      });
    }
  }

  useEffect(
    () => {
      if (state.user.name) {
        const token = '?token=' + getCookie('token');
        dispatch({ type: WS_CONNECTION_START, payload: token });
      }

      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED, payload: '' });
      }
    },
    [state.user.name, orders]
  );

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED, payload: '' });
    }
  }, []);

  return (
    <>
      {order && (
        <div className={style.container}>
          <div className={style.wrapperContent}>
            <p
              className={`${style.orderNumber} text text_type_digits-default`}
            >{`#${order.number}`}</p>
            <h2 className="text text_type_main-medium mt-10">{order.name}</h2>
            <p className="text text_type_main-default mt-3" style={color}>
              {order.status}
            </p>
            <h3 className="text text_type_main-medium mt-15">Состав:</h3>
            <ul className={style.list}>
              {order.ingredients &&
                arr.map((ingredient, index) => {
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
