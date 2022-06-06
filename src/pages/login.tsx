import React, { useCallback, useState, useRef  } from 'react';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useAuth } from '../services/auth';

export function LoginPage() {
  const location = useLocation();
  const state:any = location.state;
  const inputRefMail = useRef<HTMLInputElement>(null);
  const auth:any = useAuth();
  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = (e:any) => {
    e.preventDefault();
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const login = useCallback(
    e => {
      e.preventDefault();
      auth.signIn(form);
    },
    [auth, form]
  );

  if (auth.user.name) {
    return (
      <Redirect
        to={ state && state.from || '/' }
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={login}>
          <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>Вход</h1>
          <div className={`${styles.input} mb-6`}>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={onChange}
              value={form.email}
              name={'email'}
              error={false}
              ref={inputRefMail}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={`${styles.input} mb-6`}>
              <PasswordInput onChange={onChange} value={form.password} name={'password'} />
          </div>
          <div className={`${styles.button} mb-20`}>
            <Button type="primary" size="medium">
              Войти
            </Button>
          </div>
          <div className={`${styles.container}`}>
            <p className="text text_type_main-default text_color_inactive">
               Вы - новый пользователь?
            </p>
            <Link 
              className={`${styles.link} ml-2 mb-4 text text_type_main-default`} 
              to='/register'
            >
                Зарегистрироваться
            </Link>
          </div>
          <div className={`${styles.container}`}>
            <p className="text text_type_main-default text_color_inactive">
               Забыли пароль?
            </p>
            <Link 
              className={`${styles.link} ml-2 text text_type_main-default`} 
              to='/forgot-password'
            >
              Восстановить пароль
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}