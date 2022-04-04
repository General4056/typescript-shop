import { applyMiddleware } from '@reduxjs/toolkit';
import { IDevice } from '../types/types';

const BASE_URL = 'https://fakestoreapi.com/products';

function checkRes(res: any) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getAllCategories = () => {
  return fetch(`${BASE_URL}/categories`);
};

export const getAllItems = () => {
  return fetch(`${BASE_URL}`);
};

export const getItemsInCategory = (category: string) => {
  return fetch(`${BASE_URL}/category/${category}`);
};

export const getItemById = (id: string | undefined) => {
  return fetch(`${BASE_URL}/${id}`).then((res) => checkRes(res));
};
