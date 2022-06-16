import React, { useState } from 'react';
import headerStyles from './app-header.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';


function AppHeader() {
    const [isActive, setActive] = useState({
      burger: true,
      list: false,
      profile: false
    });

    const onClickHendler = (e:any) => {
      e.currentTarget.id === "profile" ? 
      setActive({...isActive, burger: false, list: false, profile: true}) :
      e.currentTarget.id === "list" ? 
      setActive({...isActive, burger: false, list: true, profile: false}) :
      setActive({...isActive, burger: true, list: false, profile: false})
    }

    return (
      <header className={headerStyles.header}>
        <nav className={headerStyles.nav}>
          <ul className={headerStyles.list}>
            <li className={headerStyles.list_item}>
            <NavLink 
                id="burger" 
                className={`pt-4 pr-5 pb-4 pl-5 ${headerStyles.link}`} 
                activeClassName={headerStyles.activeLink} 
                onClick={onClickHendler} 
                to='/'
                exact
            >
                <BurgerIcon type={isActive.burger ? "primary" : "secondary"} />
                <p className={`ml-2 text_type_main-default`}>
                  Конструктор
                </p>
              </NavLink>
            </li>
            <li className={headerStyles.list_item}>
              <NavLink 
                id="list" 
                className={`pt-4 pr-5 pb-4 pl-5 ${headerStyles.link}`} 
                activeClassName={headerStyles.activeLink} 
                onClick={onClickHendler} 
                to='/feed'
                exact
              >
                  <ListIcon type={isActive.list ? "primary" : "secondary"} />
                  <p className={`ml-2 ${headerStyles.text} text_type_main-default`}>
                    Лента заказов
                  </p>
              </NavLink>
            </li>
          </ul>   
        </nav>
        <img src={logo} alt="logo" className={headerStyles.logo}/>
        <NavLink 
          id="profile" 
          className={`${headerStyles.link}`} 
          activeClassName={headerStyles.activeLink} 
          onClick={onClickHendler} 
          to='/profile'
        >
          <ProfileIcon type={isActive.profile ? "primary" : "secondary"}/>
          <p className={`ml-2 ${headerStyles.text} text_type_main-default`}>
            Личный кабинет
          </p>
        </NavLink>
      </header>
    );
  };

export default AppHeader;