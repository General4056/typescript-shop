import React, { useContext, useEffect } from 'react';
import styles from './BurgerMenu.module.css';
import { MenuContext } from '../../contexts/menuContext';
import { useSelector } from 'react-redux';
import { fetchCategories, setCategory } from '../../store/reducers/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../utils/redux';

export default function BurgerMenu() {
  const { menuIsOpened, setMenuIsOpened } = useContext(MenuContext);

  const dispatch = useAppDispatch();

  function closeMenu() {
    setMenuIsOpened(false);
  }

  function setSelectedCategory(category: string) {
    dispatch(setCategory({ category }));
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <div className={menuIsOpened ? `${styles.overlay} + ${styles.overlay_active}` : styles.overlay}>
      <div className={styles.menu}>
        <h2 className={styles.title}>Каталог товаров</h2>
        <button className={styles.close} onClick={closeMenu}></button>

        {categories.map((item) => {
          return (
            <button key={item} onClick={() => setSelectedCategory(item)} className={styles.button}>
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
