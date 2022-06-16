import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderLine } from "../../components/order-list/order-list";
import { RootState } from "../../services/reducers";
import styles from '../index.module.css';

// const list = [
//   {
//     order: "#256458",
//     date: "Сегодня, 16:20 i-GMT+3",
//     name: "Death Star Starship Main бургер",
//     _id: "1",
//     ingredients: [
//       "60d3b41abdacab0026a733c7",
//       "60d3b41abdacab0026a733c8",
//       "60d3b41abdacab0026a733d0",
//       "60d3b41abdacab0026a733d2",
//       "60d3b41abdacab0026a733d2",
//       "60d3b41abdacab0026a733d2",
//       "60d3b41abdacab0026a733d2",
//       "60d3b41abdacab0026a733d2",
//     ],
//     status: 'Отменен'
//   },
//   {
//     order: "#256459",
//     date: "Сегодня, 16:20 i-GMT+3",
//     name: "Death Star Starship Main бургер мургер",
//     _id: "2",
//     ingredients: [
//       "60d3463f7034a000269f45e7",
//       "60d3463f7034a000269f45e9",
//       "60d3463f7034a000269f45e8",
//       "60d3463f7034a000269f45ea",
//     ],
//     status: 'Готовится'
//   },
//   {
//     order: "#256460",
//     date: "Сегодня, 16:20 i-GMT+3",
//     name: "Death Star Starship Main",
//     _id: "3",
//     ingredients: [
//       "60d3463f7034a000269f45e7",
//       "60d3463f7034a000269f45e9",
//       "60d3463f7034a000269f45e8",
//       "60d3463f7034a000269f45ea",
//     ],
//     status: 'Выполнен'
//   },
//   {
//     order: "#256460",
//     date: "Сегодня, 16:20 i-GMT+3",
//     name: "Death Star Starship Main",
//     _id: "4",
//     ingredients: [
//       "60d3463f7034a000269f45e7",
//       "60d3463f7034a000269f45e9",
//       "60d3463f7034a000269f45e8",
//       "60d3463f7034a000269f45ea",
//     ],
//     status: 'Создан'
//   },
//   {
//     order: "#256460",
//     date: "Сегодня, 16:20 i-GMT+3",
//     name: "Death Star Starship Main",
//     _id: "5",
//     ingredients: [
//       "60d3463f7034a000269f45e7",
//       "60d3463f7034a000269f45e9",
//       "60d3463f7034a000269f45e8",
//       "60d3463f7034a000269f45ea",
//     ],
//     status: 'Выполнен'
//   },
//   {
//     order: "#256460",
//     date: "Сегодня, 16:20 i-GMT+3",
//     name: "Death Star Starship Main",
//     _id: "6",
//     ingredients: [
//       "60d3463f7034a000269f45e7",
//       "60d3463f7034a000269f45e9",
//       "60d3463f7034a000269f45e8",
//       "60d3463f7034a000269f45ea",
//     ],
//     status: 'Выполнен'
//   },
// ];

export function OrdersPage(props:any) {
  const { onClick } = props;
  const list = useSelector((store:RootState) => {
    if (store.order) {
      return store.order['messagesUser'];
    }
  });

  return (
    <section className={`${styles.section}`}>
      <OrderLine orders={list.orders} type='profile' onClick={onClick}/>
    </section>
  );
}
