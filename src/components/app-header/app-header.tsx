import React from 'react';
import headerStyles from './app-header.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Box from '@ya.praktikum/react-developer-burger-ui-components';
import fonts from '@ya.praktikum/react-developer-burger-ui-components';
import logo from '../../images/logo.svg';

function AppHeader() {
    return (
      <header className={headerStyles.header}>
        <nav className={headerStyles.nav}>
          <ul className={headerStyles.list}>
            <li className={headerStyles.list_item}>
            <a href='#' className={`pt-4 pr-5 pb-4 pl-5 ${headerStyles.link}`}>
                <BurgerIcon type="primary" />
                <p className={`ml-2 ${headerStyles.text} ${headerStyles.text_active} text_type_main-default`}>Конструктор</p>
              </a>
            </li>
            <li className={headerStyles.list_item}>
              <a href='#' className={`pt-4 pr-5 pb-4 pl-5 ${headerStyles.link}`}>
                <ListIcon type="secondary" />
                <p className={`ml-2 ${headerStyles.text} text_type_main-default`}>Лента заказов</p>
              </a>
            </li>
          </ul>
        </nav>
        <img src={logo} alt="logo" className={headerStyles.logo}/>
        <a href='#' className={`${headerStyles.link} ${headerStyles.link_personal_area}`}>
          <ProfileIcon type="secondary" />
          <p className={`ml-2 ${headerStyles.text} text_type_main-default`}>Личный кабинет</p>
        </a>
      </header>
    );
  };

export default AppHeader;