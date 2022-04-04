import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import styles from './NavBar.module.css';
import { MenuContext } from '../../contexts/menuContext';
import { Link, useNavigate } from 'react-router-dom';
import { fetchByQuery } from '../../store/reducers/deviceSlice';
import { useAppDispatch, useAppSelector } from '../../utils/redux';
import { changeUserInfo, setLoggedIn } from '../../store/reducers/userInfoSlice';

export default function NavBar() {
  const { setMenuIsOpened } = useContext(MenuContext);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loggedIn = useAppSelector((state) => state.userInfo.loggedIn);
  const itemsInCart = useAppSelector((state) => state.shoppingCart.shoppingCartItems);

  const dispatch = useAppDispatch();

  let navigate = useNavigate();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function searchSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    dispatch(fetchByQuery(searchQuery));
    navigate('/');
    setSearchQuery('');
  }

  function openMenu() {
    setMenuIsOpened(true);
  }

  function loggedOut() {
    dispatch(setLoggedIn(false));
    dispatch(changeUserInfo({ name: '', email: '' }));
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <div className={styles.navigate}>
          <button className={styles.button} onClick={openMenu}>
            <span className={styles.button__line}></span>
          </button>
          <Link to="/" className={styles.logo}>
            КупиДевайс
          </Link>
          <div className={styles.search}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className={styles.search__input}
              placeholder="Поиск по сайту"
            />
            <button onClick={searchSubmit} className={styles.search__button} disabled={!searchQuery}></button>
          </div>
        </div>
        <Nav>
          <Link to="/shopingCart" className={styles.link}>
            <p className={styles.link__text}>Корзина</p>
            <span className={styles.link__badge}>{itemsInCart.length}</span>
          </Link>
          {loggedIn ? (
            <>
              <Link to="/account" className={styles.link}>
                Аккаунт
              </Link>
              <a href="#" className={styles.link} onClick={loggedOut}>
                Выйти
              </a>
            </>
          ) : (
            <Link to="/signIn" className={styles.link}>
              Войти
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
