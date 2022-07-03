import React, { useState, useRef, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./index.module.css";
import { setUserRequest } from "../services/api";
import { checkResponse } from "../services/actions/index";
import { useDispatch } from "../services/hooks";
import { GET_USER_SUCCESS } from "../services/actions/user-actions";
import { useAuth } from '../services/auth';

export function RegisterPage() {
  const [value, setValue] = useState("");
  const [valuePass, setValuePass] = useState("");
  const [valueName, setValueName] = useState("");
  const [register, setRegister] = useState(false);
  const dispatch = useDispatch();
  const onChange = (e: any) => {
    setValuePass(e.target.value);
  };
  const inputRefMail = useRef<HTMLInputElement>(null);
  const onSubmit = (e: any) => {
    e.preventDefault();
    setUserRequest({ name: valueName, email: value, password: valuePass })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success === true) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: res,
          });
          setRegister(true);
        }
      })
      .catch((e) => {
        console.log(e.type);
      });
    setValue("");
    setValuePass("");
    setValueName("");
  };

  if (register) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h1 className={`${styles.heading} text text_type_main-medium mb-6`}>
            Регистрация
          </h1>
          <div className={`${styles.input} mb-6`}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={(e) => setValueName(e.target.value)}
              value={valueName}
              name={"name"}
              error={false}
              ref={inputRefMail}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className={`${styles.input} mb-6`}>
            <Input
              type={"email"}
              placeholder={"E-mail"}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              name={"email"}
              error={false}
              ref={inputRefMail}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className={`${styles.input} mb-6`}>
            <PasswordInput
              onChange={onChange}
              value={valuePass}
              name={"password"}
            />
          </div>
          <div className={`${styles.button} mb-20`}>
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </div>
          <div className={`${styles.container}`}>
            <p className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?
            </p>
            <Link
              className={`${styles.link} ml-2 mb-4 text text_type_main-default`}
              to="/login"
            >
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
