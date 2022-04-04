import { FC } from 'react';
import styles from './DeviceItem.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/reducers/shoppingCartSlice';
import { IDevice } from '../../types/types';
import { useAppSelector } from '../../utils/redux';

interface DeviceItemProps {
  item: IDevice;
  title: string;
  link: string;
  price: number;
  id: number;
}

const DeviceItem: FC<DeviceItemProps> = ({ item, title, link, price, id }) => {
  const itemsInCart = useAppSelector((state) => state.shoppingCart.shoppingCartItems);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        navigate(`/device/${id}`);
      }}
      className={styles.card}>
      <img src={link} alt={title} className={styles.image} />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.price__wrapper}>
          <p className={styles.price}>{`${price} $`}</p>
          <button
            disabled={itemsInCart.some((item) => item.id === id)}
            onClick={(event) => {
              event.stopPropagation();
              dispatch(addToCart(item));
            }}
            className={styles.card__button}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceItem;
