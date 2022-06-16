import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./index.module.css";
import { OrderList } from "../components/order-list/order-list";
import { OrderInfo } from "../components/order-info/order-info";
import { WS_CONNECTION_START } from "../services/action-types";

export function FeedPage(props: any) {
  const { onClick } = props;
  const dispatch = useDispatch();

  return (
    <main className={styles.main}>
      <OrderList onClick={onClick} />
      <OrderInfo />
    </main>
  );
}
