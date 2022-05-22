import React from 'react';
import styles from './Account.module.css';
import { useAppDispatch, useAppSelector } from '../../utils/redux';
import { useInput } from '../../utils/useInput';
import { changeUserInfo } from '../../store/reducers/userInfoSlice';

export default function Account() {
  const initUserInfo = useAppSelector((state) => state.userInfo.userInfo);

  const dispatch = useAppDispatch();

  const nameInput = useInput(initUserInfo.name, {
    isEmpty: true,
    minLength: 3,
    maxLength: 30
  });

  const emailInput = useInput(initUserInfo.email, {
    isEmail: true,
    isEmpty: true,
    minLength: 3,
    maxLength: 30
  });

  function handleInfoCahnge(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!emailInput.value || !nameInput.value) return;
    dispatch(changeUserInfo({ name: nameInput.value, email: emailInput.value }));
  }
  return (
    <div className={styles.account}>
      <form className={styles.form}>
        <h2 className={styles.form__title}>Редактировать</h2>
        <label className={styles.form__label}>
          <input
            type="name"
            value={nameInput.value}
            onChange={nameInput.onChange}
            onBlur={nameInput.onBlur}
            className={styles.form__input}
            placeholder="Введите имя"
          />
          {nameInput.isDirty && !nameInput.inputValid && (
            <span className={styles.form__error}>{nameInput.errorMessage}</span>
          )}
        </label>
        <label className={styles.form__label}>
          <input
            type="email"
            value={emailInput.value}
            onChange={emailInput.onChange}
            onBlur={emailInput.onBlur}
            className={styles.form__input}
            placeholder="Введите email"
          />
          {emailInput.isDirty && !emailInput.inputValid && (
            <span className={styles.form__error}>{emailInput.errorMessage}</span>
          )}
        </label>
        <button
          onClick={handleInfoCahnge}
          className={styles.form__button}
          disabled={!nameInput.inputValid || !emailInput.inputValid}>
          Редактировать
        </button>
      </form>
    </div>
  );
}
