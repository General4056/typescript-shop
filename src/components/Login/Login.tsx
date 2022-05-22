import styles from './Login.module.css';
import { useInput } from '../../utils/useInput';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../utils/redux';
import { changeUserInfo, setLoggedIn } from '../../store/reducers/userInfoSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const passwordInput = useInput('', {
    isEmpty: true,
    minLength: 5,
    maxLength: 16
  });

  function handleLogin() {
    if (!emailInput.value || !passwordInput.value) return;
    dispatch(setLoggedIn(true));
    dispatch(changeUserInfo({ name: nameInput.value, email: emailInput.value }));
    navigate('/');
  }

  return (
    <div className={styles.login}>
      <form className={styles.form}>
        <h2 className={styles.form__title}>Вход</h2>
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
        <label className={styles.form__label}>
          <input
            type="password"
            value={passwordInput.value}
            onChange={passwordInput.onChange}
            onBlur={passwordInput.onBlur}
            className={styles.form__input}
            placeholder="Введите пароль"
          />
          {passwordInput.isDirty && !passwordInput.inputValid && (
            <span className={styles.form__error}>{passwordInput.errorMessage}</span>
          )}
        </label>
        <button
          onClick={handleLogin}
          className={styles.form__button}
          disabled={!passwordInput.inputValid || !emailInput.inputValid || !nameInput.inputValid}>
          Войти
        </button>
      </form>
    </div>
  );
}
