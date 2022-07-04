import React, { useCallback, useState, useRef, ChangeEvent } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './index.module.css';
import { setResetPasswordRequest } from '../services/api';
import { checkResponse } from '../services/actions/index';
import { useAuth } from '../services/auth';
import { IAuth } from '../utils/types';

export function ResetPasswordPage() {
  const [form, setValue] = useState({ password: '', token: '' });
  const [passwordReset, setPasswordReset] = useState(false);
  const auth:IAuth = useAuth();
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  const resetPassword = useCallback(
    e => {
      e.preventDefault();
      setResetPasswordRequest(form)
      .then(checkResponse)
      .then(res => {
        if (res && res.success === true) {
          setPasswordReset(true);
        }
      })
      .catch(e => {
        console.log(e.type);
      })
    },
    [form]
  );

  const inputRefMail = useRef<HTMLInputElement>(null);

  if (auth.user.name) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  if (passwordReset) {
    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={resetPassword}>
          <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Восстановление пароля</h1>
          <div className={`${styles.input} mb-6`}>
              <PasswordInput onChange={onChange} value={form.password} name={'password'} />
          </div>
          <div className={`${styles.input} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={onChange}
              value={form.token}
              name={'token'}
              error={false}
              ref={inputRefMail}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={`${styles.button} mb-20`}>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
          <div className={`${styles.container}`}>
            <p className="text text_type_main-default text_color_inactive">
               Вспомнили пароль?
            </p>
            <Link 
              className={`${styles.link} ml-2 text text_type_main-default`} 
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