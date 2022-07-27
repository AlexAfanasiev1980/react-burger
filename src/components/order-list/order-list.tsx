import React, { useEffect, useCallback, useRef } from "react";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import styles from "./order-list.module.css";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { ILocation, IOrder, IOnClick, Ingredient } from "../../utils/types";
import { v4 as uuidv4 } from "uuid";

export function OrderItem(props: {
  order: IOrder;
  cards: Array<Ingredient>;
  type: string;
  onClick: (order: IOrder) => void;
}) {
  const { order, cards, type, onClick } = props;
  const { url } = useRouteMatch();
  const location: ILocation = useLocation();

  const number = order.ingredients.length - 6;
  const sum = order.ingredients.reduce((acc: number, el: string) => {
    const data = cards.find((item: Ingredient) => item._id === el);
    if (data) {
      const price = data.price;
      return acc + price;
    }
    return acc;
  }, 0);

  let color = {
    color: "#F2F2F3",
  };
  order.status === "Выполнен"
    ? (color.color = "#00CCCC")
    : order.status === "Отменен"
    ? (color.color = "#b50000")
    : null;

  let day = "";
  const now = new Date();
  const today = now.setHours(23, 59, 59, 999).valueOf();

  const otherDay = new Date(order.createdAt);
  const other = otherDay.valueOf();

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

  return (
    <li className={`${styles.listItem}`} onClick={() => onClick(order)}>
      <Link
        to={{
          pathname: `${url}/${order._id}`,
          state: { background: location },
        }}
        className={styles.link}
      >
        <div className={styles.identification}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <p className={`${styles.textDate} text text_type_main-small`}>
            {`${day}`}
          </p>
        </div>
        <h2 className="text text_type_main-medium mt-6">{order.name}</h2>
        {type === "profile" && (
          <p className="mt-2 mb-0" style={color}>
            {order.status}
          </p>
        )}
        <div className={`${styles.identification} mt-6`}>
          <ul className={styles.imageContainer}>
            {order.ingredients.map((id, index) => {
              const dataCard = cards.find((card: Ingredient) => card._id === id);
              if (index === 6) {
                const styleModal = {
                  left: -147,
                  zIndex: 550,
                };
                return (
                  <li
                    key={index}
                    style={styleModal}
                    className={`${styles.image} ${styles.modal}`}
                  >
                    <p
                      className={`${styles.modalText} text text_type_main-small`}
                    >{`+${number}`}</p>
                  </li>
                );
              }
              if (dataCard && index < 6) {
                const left = index * -16;
                const zindex = (10 - index) * 100;
                const container = {
                  zIndex: zindex,
                  left: left,
                };
                return (
                  <li
                    key={index}
                    style={container}
                    className={`${styles.image}`}
                  >
                    <img src={`${dataCard.image_mobile}`} alt="" />
                  </li>
                );
              }
            })}
          </ul>
          <p className={`${styles.priceItem}`}>
            <span className={`mr-2 text_type_digits-default`}>{sum}</span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </li>
  );
}

export function OrderLine(
  props: { orders: Array<IOrder>, type: string, onClick: (order: IOrder) => void }
) {
  const { orders, type, onClick } = props;
  const dataCards = useSelector((store) => {
    return store.ingredient.baseIngredients;
  });
  const width = {
    width: 600,
  };
  if (type === "profile") {
    width.width = 860;
  }

  return (
    <main className={styles.main}>
      <ul className={styles.list} style={width}>
        {orders &&
          orders.map((order, index) => {
            return (
              <OrderItem
                order={order}
                key={index}
                cards={dataCards}
                type={type}
                onClick={onClick}
              />
            );
          })}
      </ul>
    </main>
  );
}

export function OrderList(props: {onClick: (order: IOrder) => void}) {
  const { onClick } = props;
  const list = useSelector((store) => {
    if (store.order) {
      return store.order["messages"];
    }
  });

  let data: Array<IOrder> = [];
  if (list) {
   data = list.orders;
  } 
  return (
    <section className={`${styles.section} mr-15`}>
      <h1 className={`text text_type_main-large mb-5`}>Лента заказов</h1>
      <OrderLine orders={data} type="line" onClick={onClick} />
    </section>
  );
}
