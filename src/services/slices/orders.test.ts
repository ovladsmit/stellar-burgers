import { ordersReducer, initialState, fetchOrders } from './ordersSlice';
import { expect, test, describe } from '@jest/globals';
const mockOrders = [
  {
    _id: '1',
    ingredients: ['ingredient-1'],
    status: 'done',
    name: 'Тестовый заказ',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 1
  }
];

describe('orders async action', () => {
  test('Request', () => {
    const state = ordersReducer(
      initialState,
      fetchOrders.pending('', undefined)
    );

    expect(state.ordersRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Success', () => {
    const state = ordersReducer(
      initialState,
      fetchOrders.fulfilled(mockOrders, '', undefined)
    );

    expect(state.ordersRequest).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  test('Failed', () => {
    const state = ordersReducer(
      initialState,
      fetchOrders.rejected(new Error('Ошибка'), '', undefined)
    );

    expect(state.ordersRequest).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
