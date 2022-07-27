import React, { useEffect } from "react";
import { useDispatch } from "../services/hooks";
import styles from "./index.module.css";
import { OrderList } from "../components/order-list/order-list";
import { OrderInfo } from "../components/order-info/order-info";
import { IOrder } from '../utils/types';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../services/action-types";

export function FeedPage(props: {onClick: (order: IOrder) => void}) {
  const { onClick } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED, payload: '' });
    }
  }, []);

  return (
    <main className={styles.main}>
      <OrderList onClick={onClick} />
      <OrderInfo />
    </main>
  );
}
