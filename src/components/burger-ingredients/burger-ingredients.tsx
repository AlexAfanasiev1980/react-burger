import React, { useState } from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import Box, {Counter, Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import fonts from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Switch() {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

class BurgerIngredients extends React.Component<any, any> {
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <section className={`${ingredientsStyles.ingredients} section-item`}>
        <h1 className={`mt-10 mb-5 text_type_main-large`}>Соберите бургер</h1>
        <Switch />
        <div className={`mt-10 ${ingredientsStyles.menu}`}>
          <div>
            <h2 className={`${ingredientsStyles.menu_item} mb-6 text_type_main-medium`}>Булки</h2>
              <ul className={`${ingredientsStyles.list} ml-4 mb-10`}>
                {this.props.dataCard.map((card:any, index:any) => {
                  if (card.type === 'bun') {
                    return (
                      <li className={ingredientsStyles.list_item} key={index}>
                        <img src={card.image} alt="image" className={`ml-4 mb-1 ${ingredientsStyles.image}`}/>
                        <p className={`${ingredientsStyles.price_item}`}> 
                        <span className={`mr-2 text_type_digits-default`}>{card.price}</span> 
                        <CurrencyIcon type="primary" /> </p>
                        <h3 className={`mt-1 text_type_main-small`}> {card.name} </h3>
                        <Counter count={1} size="default" />
                      </li>
                    )
                  }  
               
                })}
              </ul>
          </div>
          <div>
            <h2 className={`${ingredientsStyles.menu_item} mb-6 text_type_main-medium`}>Соусы</h2>
              <ul className={`${ingredientsStyles.list} ml-4 mb-10`}>
                {this.props.dataCard.map((card:any, index:any) => {
                  if (card.type === 'sauce') {
                    return (
                      <li className={ingredientsStyles.list_item} key={index}>
                        <img src={card.image} alt="image" className={`ml-4 mb-1 ${ingredientsStyles.image}`}/>
                        <p className={`${ingredientsStyles.price_item}`}> 
                        <span className={`mr-2 text_type_digits-default`}>{card.price}</span> 
                        <CurrencyIcon type="primary" /> </p>
                        <h3 className={`mt-1 text_type_main-small`}> {card.name} </h3>
                      </li>
                    )
                  }  
               
                })}
              </ul>
          </div>
          <div>
            <h2 className={`${ingredientsStyles.menu_item} mb-6 text_type_main-medium`}>Начинки</h2>
              <ul className={`${ingredientsStyles.list} ml-4 mb-10`}>
                {this.props.dataCard.map((card:any, index:any) => {
                  if (card.type === 'main') {
                    return (
                      <li className={ingredientsStyles.list_item} key={index}>
                        <img src={card.image} alt="image" className={`ml-4 mb-1 ${ingredientsStyles.image}`}/>
                        <p className={`${ingredientsStyles.price_item}`}> 
                        <span className={`mr-2 text_type_digits-default`}>{card.price}</span> 
                        <CurrencyIcon type="primary" /> </p>
                        <h3 className={`mt-1 text_type_main-small`}> {card.name} </h3>
                      </li>
                    )
                  }  
               
                })}
              </ul>
          </div>
        </div> 
      </section>
    );
  }
}

export default BurgerIngredients;