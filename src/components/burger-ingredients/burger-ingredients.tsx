import React from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import Box from '@ya.praktikum/react-developer-burger-ui-components';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import fonts from '@ya.praktikum/react-developer-burger-ui-components';
// import PropTypes from 'prop-types';

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={ingredientsStyles.ingredients}>
        <h2 className={`mt-10 mb-5 text_type_main-large`}>{this.props.dataCard} Соберите бургер</h2>
      </section>
    );
  }
}

export default BurgerIngredients;