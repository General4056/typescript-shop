import { FC } from 'react';
import styles from './CartItem.module.css';
import { Link } from 'react-router-dom';
import { changeQuantity, deleteFromCart } from '../../store/reducers/shoppingCartSlice';
import { ICartItem } from '../../types/types';
import { useAppDispatch } from '../../utils/redux';

interface CartItemProps {
  item: ICartItem;
  id: number;
}

const CartItem: FC<CartItemProps> = ({ item, id }) => {
  const dispatch = useAppDispatch();

  function changeCount(value: number) {
    dispatch(changeQuantity({ id, value: value }));
  }

  function deleteItemFromCart() {
    dispatch(deleteFromCart({ id }));
  }

  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.title} className={styles.image} />
      <Link to={`/device/${id}`} className={styles.title}>
        {item.title}
      </Link>
      <div className={styles.counter}>
        <button
          disabled={item.quantity === 0}
          className={styles.counter__minus}
          onClick={() => changeCount(-1)}></button>
        <div className={styles.counter__input}>{item.quantity}</div>
        <button className={styles.counter__plus} onClick={() => changeCount(1)}></button>
      </div>
      <p className={styles.price}>{`${item.price} $`}</p>
      <button className={styles.delete} onClick={() => deleteItemFromCart()}></button>
    </div>
  );
};

export default CartItem;
