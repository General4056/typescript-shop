import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from '../../utils/api';
import styles from './DevicePage.module.css';
import Loader from '../Loader/Loader';
import { addToCart } from '../../store/reducers/shoppingCartSlice';
import { useAppDispatch, useAppSelector } from '../../utils/redux';
import { IDevice } from '../../types/types';

export default function DevicePage() {
  const [product, setProduct] = useState<IDevice>({
    id: 0,
    title: '',
    description: '',
    category: '',
    image: '',
    price: 0
  });

  interface DevicePageParams {
    id?: string;
  }

  const [productLoading, setProductLoading] = useState<Boolean>(false);

  const dispatch = useAppDispatch();

  const itemsInCart = useAppSelector((state) => state.shoppingCart.shoppingCartItems);

  const params: DevicePageParams = useParams();

  useEffect(() => {
    setProductLoading(true);
    getItemById(params.id)
      .then((item) => {
        setProduct(item);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setProductLoading(false);
      });
  }, []);

  function addItem(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    dispatch(addToCart(product));
  }

  return productLoading ? (
    <div className={styles.loader__container}>
      <Loader></Loader>
    </div>
  ) : (
    <div className={styles.page}>
      <h2 className={styles.title}>{product.title}</h2>
      <div className={styles.page__container}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <div>
          <div className={styles.short_descr}>
            <p>Краткое описание:</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac porta sapien. Teget mollis elit.</p>
          </div>
          <div className={styles.buy__container}>
            <div className={styles.price__top_line}>
              <div className={styles.price}>{product.price} $</div>
              <button
                className={styles.button}
                onClick={(e) => addItem(e)}
                disabled={itemsInCart.some((item) => item.id === Number(params.id))}>
                Купить
              </button>
            </div>
            <div className={styles.price__bot_line}>
              <div className={styles.oreder}>
                <p className={styles.oreder__text}>В наличии:</p>
                <p className={styles.oreder__text}>15 шт</p>
              </div>
              <div className={styles.oreder}>
                <p className={styles.oreder__text}>Пункты выдачи:</p>
                <p className={styles.oreder__text}>доступны</p>
              </div>
              <div className={styles.oreder}>
                <p className={styles.oreder__text}>Доставим на дом:</p>
                <p className={styles.oreder__text}>завтра</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.description}>{product.description}</div>
    </div>
  );
}
