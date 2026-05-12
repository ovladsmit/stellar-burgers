import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders, getOrders, getOrdersRequest } from '../../services/slices/ordersSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  const orders: TOrder[] = []
  if (!orders) {
    return <Preloader />;
  }
  return( <FeedUI orders={orders} handleGetFeeds={() => {}} />)
  
};
