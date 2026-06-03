import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrders,
  getOrders,
  getOrdersRequest
} from '../../services/slices/ordersSlice';
import {
  getFeedsOrders,
  getFeedsOrdersRequest,
  fetchFeedOrders
} from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  const orders: TOrder[] = useSelector(getFeedsOrders);
  const isLoading = useSelector(getFeedsOrdersRequest);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeedOrders());
  }, []);
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(fetchFeedOrders())}
    />
  );
};
