import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getConstructorItems } from '../../services/slices/constructorSlice';
import { closeModal } from '../../services/slices/orderSlice';
import { createOrder, getOrderModalData, getOrderRequest } from '../../services/slices/orderSlice';
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch()
  const constructorItems = useSelector(getConstructorItems)
  

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(createOrder([
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ]))
  };
  const closeOrderModal = () => {
    dispatch(closeModal())
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v) => s + v.price,
        0
      ),
    [constructorItems]
  );

  

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
