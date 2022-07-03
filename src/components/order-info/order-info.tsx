import React, { useEffect, useCallback, useRef } from "react";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import styles from "./order-info.module.css";
import { RootState } from "../../services/reducers";
import { v4 as uuidv4 } from "uuid";
import { IOrder } from "../../utils/types";

export function OrderInfo() {
  const list = useSelector((store: RootState) => {
    if (store.order) {
      return store.order["messages"];
    }
  });
  let orders: Array<IOrder> = [];
  if (list) {
    orders = list.orders;
  }

  return (
    <section className={`${styles.container} pt-15`}>
      <div className={`${styles.ordersContainer} mb-15`}>
        <div className={styles.listNumber}>
          <h2 className={`${styles.title} text text_type_main-medium mb-6`}>
            Готовы:
          </h2>
          <ul className={`${styles.list} ${styles.listFinal}`}>
            {orders &&
              orders.map((order: IOrder, index: number) => {
                if (order.status === "done") {
                  return (
                    <li
                      className="text text_type_digits-default mr-3"
                      key={uuidv4()}
                    >
                      {order.number}
                    </li>
                  );
                }
              })}
          </ul>
        </div>
        <div className={styles.listNumber}>
          <h2 className={`${styles.title} text text_type_main-medium mb-6`}>
            В работе:
          </h2>
          <ul className={`${styles.list} ${styles.listWork}`}>
            {orders &&
              orders.map((order: IOrder, index: number) => {
                if (order.status !== "done") {
                  return (
                    <li
                      className="text text_type_digits-default"
                      key={uuidv4()}
                    >
                      {order.number}
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
      <div className="mb-15">
        <h2 className={`${styles.title} text text_type_main-medium`}>
          Выполнено за все время:
        </h2>
        {list && <p className="text text_type_digits-large">{list.total}</p>}
      </div>
      <div>
        <h2 className={`${styles.title} text text_type_main-medium`}>
          Выполнено за сегодня:
        </h2>
        {list && (
          <p className="text text_type_digits-large">{list.totalToday}</p>
        )}
      </div>
    </section>
  );
}
