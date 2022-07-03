import { getCookie } from './utils';

export const baseUrl = 'https://norma.nomoreparties.space/api/';

export const deserializeQuery = (query:any, noQuestionMark = false) => {
  const pairs = (noQuestionMark ? query : query.substring(1)).split('&');
  const array = pairs.map((elem:any) => elem.split('='));
  return Object.fromEntries(array);
};

export const serializeQuery = (queryParams:any) =>
  Object.entries(queryParams).reduce((acc, [key, value]:any, index, array) => {
    if (typeof value === 'undefined') {
      return acc;
    }
    const postfix = index === array.length - 1 ? '' : '&';
    return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`;
  }, '?');

export const getPasswordRequest = async (email:{email: string}) => {
  return await fetch(`${baseUrl}password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(email)
  });
};

export const setResetPasswordRequest = async (form:{password: string, token: string}) => {
  return await fetch(`${baseUrl}password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

export const loginRequest = async (form:{email: string, password: string}) => {
  return await fetch(`${baseUrl}auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

export const getUserRequest = async () =>
  await fetch(`${baseUrl}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

  export const apdateUserDataRequest = async (form:{email: string, password: string, name: string}) =>
  await fetch(`${baseUrl}auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });

  export const apdateTokenRequest = async () =>
  await fetch(`${baseUrl}auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: localStorage.getItem('refreshToken')
  });

export const logoutRequest = async (token:string|null) => {
  return await fetch(`${baseUrl}auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(token)
  });
};

export const setUserRequest = async (data:{email: string, password: string, name: string}) => {
  return await fetch(`${baseUrl}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
     },
    body: JSON.stringify({
    "email": data.email, 
    "password": data.password, 
    "name": data.name}),
  })
};