import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import {
  getOrders,
  getOrdersRequest,
  fetchOrders
} from '../../services/slices/ordersSlice';

import { useDispatch, useSelector } from '../../services/store';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const orders: TOrder[] = useSelector(getOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  console.log('orders:', orders);
  return <ProfileOrdersUI orders={orders} />;
};
