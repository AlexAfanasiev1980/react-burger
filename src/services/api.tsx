import { getCookie } from './utils';
// import { checkResponse } from './actions/index';
// import { textChangeRangeIsUnchanged } from 'typescript';


const baseUrl = 'https://norma.nomoreparties.space/api/';

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

// export const getCountriesRequest = async () =>
//   await fetch('https://cosmic.nomoreparties.space/api/countries', {
//     method: 'GET',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + getCookie('token')
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer'
//   })
//     .then(res => res.json())
//     .then(({ countries }) => countries);

// export const getLaureatesRequest = async () =>
//   await fetch('https://cosmic.nomoreparties.space/api/laureates', {
//     method: 'GET',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + getCookie('token')
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer'
//   })
//     .then(res => res.json())
//     .then(({ laureates }) => laureates);

export const getPasswordRequest = async (email:any) => {
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

export const setResetPasswordRequest = async (form:any) => {
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

export const loginRequest = async (form:any) => {
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

  export const apdateUserDataRequest = async (form:any) =>
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

export const logoutRequest = async (token:string) => {
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

export const setUserRequest = async (data:any) => {
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