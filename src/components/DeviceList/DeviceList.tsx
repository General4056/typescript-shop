import React from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from './DeviceList.module.css';
import DeviceItem from '../DeviceItem/DeviceItem';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../utils/redux';

export default function DeviceList() {
  const itemList = useAppSelector((state) => state.device.deviceList);
  const statusOfLoading = useAppSelector((state) => state.device.status);

  return (
    <Container>
      <Row>
        {statusOfLoading === 'loading' ? (
          <div className={styles.loader__container}>
            <Loader />
          </div>
        ) : (
          itemList.map((item) => {
            return (
              <DeviceItem
                item={item}
                key={item.id}
                title={item.title}
                link={item.image}
                price={item.price}
                id={item.id}
              />
            );
          })
        )}
      </Row>
    </Container>
  );
}
