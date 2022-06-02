import React, { useState } from 'react';
import styleMain from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { VIEWED_INGREDIENT } from '../../services/actions/index';
import { MODAL_VISIBLE, CLOSE_MODAL } from '../../services/actions/actions';
import { sendOrder } from '../../services/actions/actions';
import { RootState } from '../../services/reducers';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Ingredient } from '../../utils/types';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { ProtectedRoute } from '../protected-routh';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFound404 } from '../pages';

function App() {
  
  const dispatch = useDispatch();
  const [currentIngredient, setCurrentIngredient] = useState({
    isIngredient: false,
  });

  const { viewIngredient, modalVisible, numOrder } = useSelector((store:RootState) => {
    return store.ingredient
  });
  const location:any = useLocation();
  const background:any = location.state?.background;
  console.log(location);
  console.log(background);
  let history:any = useHistory();

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

  const openModal = (selectCards:any) =>
  {
    return dispatch(sendOrder(selectCards))
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
    history.push("/");
  }
  
  const modalOrder = (
    <Modal onClose={handleCloseModal} title=''> 
      <OrderDetails numOrder = {numOrder}/>
    </Modal>
);

  return (
    <>
        <AppHeader />
        <Switch >
        {/* location={background || location} */}
          <ProtectedRoute path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <main className={styleMain.main}>
                <BurgerIngredients onClick={openModalIngredients}/>
                <BurgerConstructor 
                onClick={openModal} 
                />
              </main>
            </DndProvider>
          </ProtectedRoute>
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
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path={`/ingredients/:id`} exact={true} location={background || location}>
                <IngredientDetails data={viewIngredient} title={'Детали ингредиента'} onClose={handleCloseModal}/>
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      {background && (
        <Switch>
          <Route
            path="/ingredients/:id">
              <Modal onClose={handleCloseModal}> 
                <IngredientDetails data={viewIngredient} title={'Детали ингредиента'} onClose={handleCloseModal}/>
              </Modal>
          </Route>
        </Switch>
      )}
      {modalVisible && 
      !currentIngredient.isIngredient && 
      modalOrder}
    </>
  );
}

export default App;