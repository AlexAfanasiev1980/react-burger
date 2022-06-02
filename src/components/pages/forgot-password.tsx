import React, { useState, useRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { checkResponse } from '../../services/actions/index';
import { getPasswordRequest } from '../../services/api';
import { useAuth } from '../../services/auth';

export function ForgotPasswordPage() {
  const [value, setValue] = useState('')
  const [emailReset, setEmailReset] = useState(false);
  const auth:any = useAuth();

  const onClick = (e:any) => {
    e.preventDefault();
    getPasswordRequest({email: value})
    .then(checkResponse)
    .then(res => {
      if (res && res.success === true) {
        setEmailReset(true);
      }
    })
    .catch(e => {
      console.log(e.type);
    })
  }
  const inputRefMail = useRef<HTMLInputElement>(null);

  if (auth.user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  if (emailReset) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Восстановление пароля</h1>
          <div className={`${styles.input} mb-6`}>
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
              onChange={e => setValue(e.target.value)}
              value={value}
              name={'email'}
              error={false}
              ref={inputRefMail}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={`${styles.button} mb-20`}>
            <Button type="primary" size="medium" onClick={onClick}>
              Восстановить
            </Button>
          </div>
          <div className={`${styles.container}`}>
            <p className="text text_type_main-default text_color_inactive">
               Вспомнили пароль?
            </p>
            <Link 
              className={`${styles.link} ml-2 mb-4 text text_type_main-default`} 
              to='/login'
            >
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}