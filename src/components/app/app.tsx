import React, { useState, useEffect } from 'react';
import styleMain from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import ModalOrder from '../modal-order/modal-order';
import Order from '../order/order';
import OrderPage from '../order/order-page';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientDetailsPage from '../ingredient-details/ingredient-details-page';
import { useDispatch, useSelector } from 'react-redux';
import { VIEWED_INGREDIENT, VIEWED_ORDER } from '../../services/actions/index';
import { MODAL_VISIBLE, CLOSE_MODAL } from '../../services/actions/actions';
import { sendOrder } from '../../services/actions/actions';
import { RootState } from '../../services/reducers';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Ingredient } from '../../utils/types';
import { Redirect, Switch, Route, Router } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { getMessages, getUser, getWsConnected } from '../../services/selectors';
import { ProtectedRoute } from '../protected-routh';
import { getItems } from '../../services/actions/index';
import { WS_CONNECTION_START } from "../../services/action-types";
import { LoginPage, FeedPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFound404 } from '../../pages';

function App() {

  const dispatch = useDispatch();
  const [currentIngredient, setCurrentIngredient] = useState({
    isIngredient: false,
  });

  const { viewIngredient, modalVisible, numOrder } = useSelector((store:RootState) => {
    return store.ingredient
  });
  const state = useSelector((store:RootState) => {
    return store.user
  });
  const location:any = useLocation();
  const background:any = location.state && location.state.background;
  const history:any = useHistory();

  const openModalIngredients = (card: Ingredient) => {
    dispatch({
      type: VIEWED_INGREDIENT,
      payload: card
    })
    setCurrentIngredient({...currentIngredient, isIngredient: true});
    dispatch({
      type: MODAL_VISIBLE
    });
  }

  const openModalOrder = (order: any) => {
    dispatch({
      type: VIEWED_ORDER,
      payload: order
    })
    setCurrentIngredient({...currentIngredient, isIngredient: true});
    dispatch({
      type: MODAL_VISIBLE
    });
  }

  const openModal = (selectCards:any) => {
    if (state.user.name) {
      return dispatch(sendOrder(selectCards))
    } else {
      history.push('/login');
    }
  };

  const handleCloseModal = () => {
    dispatch({
      type: CLOSE_MODAL
    });
    setCurrentIngredient({...currentIngredient, isIngredient: false});
    dispatch({
      type: VIEWED_INGREDIENT,
      payload: {}
    });
    if (background) {
      history.push(background.pathname);
    } else {
      history.push("/");
    }

  }

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, []);
  
  const modalOrder = (
    <Modal onClose={handleCloseModal} title=''> 
      <OrderDetails numOrder = {numOrder}/>
    </Modal>
);

  return (
    <>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <main className={styleMain.main}>
                <BurgerIngredients onClick={openModalIngredients}/>
                <BurgerConstructor 
                onClick={openModal} 
                />
              </main>
            </DndProvider>
          </Route>
          <Route path="/feed" exact={true}>
            <FeedPage onClick={openModalOrder} />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage onClick={openModalOrder}/>
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfilePage onClick={openModalOrder}/>
          </ProtectedRoute>
          <Route path={`/ingredients/:id`} exact={true}>
            <IngredientDetailsPage
              title={'Детали ингредиента'} 
              onClose={handleCloseModal}
            />
          </Route>
          <Route path={`/feed/:id`} exact={true}>
              <OrderPage
                title={''}
                onClose={handleCloseModal}
              />
          </Route>
          <Route path={`/profile/orders/:id`} exact={true}>
              <OrderPage
                title={''}
                onClose={handleCloseModal}
              />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      {background && 
        <Switch>
          <Route
            path="/ingredients/:id">
              <Modal onClose={handleCloseModal} title={'Детали ингредиента'}> 
                <IngredientDetails 
                  title={'Детали ингредиента'}
                  onClose={handleCloseModal}
                />
              </Modal>
          </Route>
          <Route path="/feed/:id">
            <ModalOrder onClose={handleCloseModal} title={'Детали ингредиента'}>
              <Order
                title={'Детали ингредиента'}
                onClose={handleCloseModal}
              />
            </ModalOrder>
          </Route>
          <Route path="/profile/orders/:id">
            <ModalOrder onClose={handleCloseModal} >
              <Order
                title={'Детали ингредиента'}
                onClose={handleCloseModal}
              />
            </ModalOrder>
          </Route>
        </Switch>
      }
      {modalVisible && 
      !currentIngredient.isIngredient && 
      modalOrder}
    </>
  );
}

export default App;