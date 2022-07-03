import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { OrderLine } from "../../components/order-list/order-list";
import { RootState } from "../../services/reducers";
import { getCookie } from '../../services/utils';
import { WS_CONNECTION_CLOSED } from '../../services/action-types';
import { WS_CONNECTION_START } from '../../services/action-types/wsActionTypes';
import styles from "../index.module.css";
import { IOrder } from '../../utils/types';

export function OrdersPage(props: {onClick: (order: IOrder) => void}) {
  const { onClick } = props;
  const dispatch = useDispatch();
  const list = useSelector((store: RootState) => {
    if (store.order) {
      return store.order["messages"];
    }
  });
  console.log(list)
  const state = useSelector((store:RootState) => {
    return store.user
  });

  useEffect(
    () => {
      const token = '?token=' + getCookie('token');
      if (state.user.name) {
        dispatch({ type: WS_CONNECTION_START, payload: token });
      }

      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED, payload: '' });
      }
    },
    [state.user.name]
  );

  return (
    <section className={`${styles.section}`}>
      {list && 
        <OrderLine orders={list.orders} type="profile" onClick={onClick} />
      }
      
    </section>
  );
}
