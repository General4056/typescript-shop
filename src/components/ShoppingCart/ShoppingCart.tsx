import React, { useState, useEffect } from 'react';
import styles from './ShoppingCart.module.css';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../utils/useInput';
import cartImage from '../../images/empty.png';
import { ICartItem } from '../../types/types';
import { useAppSelector } from '../../utils/redux';
import CartItem from '../CartItem/CartItem';

export default function ShoppingCart() {
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const itemsInCart: ICartItem[] = useAppSelector((state) => state.shoppingCart.shoppingCartItems);

  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    let quantity = 0;
    itemsInCart.forEach((item) => {
      price += item.price * item.quantity;
      quantity += item.quantity;
    });
    setFinalPrice(Math.floor(price));
    setTotalQuantity(quantity);
  }, [itemsInCart]);

  const nameInput = useInput('', {
    isEmpty: true,
    minLength: 3,
    maxLength: 30
  });
  const emailInput = useInput('', {
    isEmail: true,
    isEmpty: true,
    minLength: 3,
    maxLength: 30
  });

  function navToMain(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    navigate(`/`);
  }

  return itemsInCart.length === 0 ? (
    <div className={styles['empty-cart']}>
      <h2 className={styles['empty-cart__title']}>Корзина</h2>
      <img src={cartImage} alt="empty cart" className={styles['empty-cart__image']} />
      <p className={styles['empty-cart__text']}>В вашей корзине отсутствуют товары</p>
      <button onClick={(e) => navToMain(e)} className={styles['empty-cart__button']}>
        Вернутся на главную
      </button>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.cart__container}>
        {itemsInCart.map((item) => {
          return <CartItem id={item.id} key={item.id} item={item} />;
        })}
      </div>
      <form className={styles.form}>
        <h3 className={styles.form__title}>В корзине</h3>
        <p className={styles.form__quantity}>{totalQuantity} товаров</p>
        <p className={styles.form__price}>{`${finalPrice} $`}</p>
        <label className={styles.form__label}>
          <input
            value={nameInput.value}
            onChange={nameInput.onChange}
            onBlur={nameInput.onBlur}
            type="text"
            name="name"
            className={styles.form__input}
            placeholder="введите ваше имя"
            required
          />
          {nameInput.isDirty && !nameInput.inputValid && (
            <span className={styles.form__error}>{nameInput.errorMessage}</span>
          )}
        </label>
        <label className={styles.form__label}>
          <input
            value={emailInput.value}
            onChange={emailInput.onChange}
            onBlur={emailInput.onBlur}
            type="email"
            name="email"
            className={styles.form__input}
            placeholder="введите email"
            required
          />
          {emailInput.isDirty && !emailInput.inputValid && (
            <span className={styles.form__error}>{emailInput.errorMessage}</span>
          )}
        </label>

        <label className={styles.form__label}>
          <input type="tel" name="tel" className={styles.form__input} placeholder="введите номер телефона" required />
        </label>
        <button disabled={!nameInput.inputValid || !emailInput.inputValid} className={styles.form__submit}>
          оформить заказ
        </button>
      </form>
    </div>
  );
}
