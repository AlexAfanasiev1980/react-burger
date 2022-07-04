import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../index.module.css";
import { useSelector } from "../../services/hooks";
import { checkResponse } from "../../services/actions/index";
import { UPDATE_USER_SUCCESS } from "../../services/actions/user-actions";
import { useDispatch } from "../../services/hooks";
import { apdateUserDataRequest } from "../../services/api";

export function ProfileDataPage() {
  const [disabledName, setDisabledName] = useState(true);
  const [valuePass, setValuePass] = useState("");
  const [valueName, setValueName] = useState("");
  const [valueLogin, setValueLogin] = useState("");
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((store) => {
    return store.user;
  });

  useEffect(() => {
    setValueLogin(user.email);
    setValueName(user.name);
    setValuePass(user.password);
  }, [user]);

  useEffect(() => {
    if (
      valuePass !== user.password ||
      valueName !== user.name ||
      valueLogin !== user.email
    ) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [valuePass, valueName, valueLogin, user.email, user.name, user.password]);

  const cancel = () => {
    setValueLogin(user.email);
    setValueName(user.name);
    setValuePass(user.password);
  };

  const save = (e: React.SyntheticEvent) => {
    e.preventDefault();
    apdateUserDataRequest({
      email: valueLogin,
      password: valuePass,
      name: valueName,
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success === true) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: { ...res.user, password: valuePass },
          });
          localStorage.setItem("password", valuePass);
        }
      })
      .catch((e) => {
        console.log(e.type);
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name === "password"
      ? setValuePass(e.target.value)
      : e.target.name === "name"
      ? setValueName(e.target.value)
      : setValueLogin(e.target.value);
  };

  const onClickWindow = (e: any) => {
    console.log(e);
    if (e.target.name !== "name") {
      setDisabledName(true);
      window.removeEventListener("click", onClickWindow);
    }
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    setDisabledName(false);
    window.addEventListener("click", onClickWindow);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.wrapperProfile}>
      <div className={`${styles.container} ${styles.containerProfile}`}>
        <div className={`${styles.input} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon={"EditIcon"}
            value={valueName}
            name={"name"}
            error={false}
            disabled={disabledName}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${styles.input} mb-6`}>
          <EmailInput onChange={onChange} value={valueLogin} name={"email"} />
        </div>
        <div className={`${styles.input} mb-6`}>
          <PasswordInput
            onChange={onChange}
            value={valuePass}
            name={"password"}
          />
        </div>
      </div>
      {display && (
        <div className={styles.wrapperButton}>
          <Button type="primary" size="medium" onClick={save}>
            Сохранить
          </Button>
          <Button type="primary" size="medium" onClick={cancel}>
            Отмена
          </Button>
        </div>
      )}
    </div>
  );
}
