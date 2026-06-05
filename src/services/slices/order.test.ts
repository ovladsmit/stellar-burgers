import { expect, test, describe } from '@jest/globals';
import {
  orderReducer,
  initialState,
  createOrder,
  fetchOrderByNumber
} from './orderSlice';

const mockOrder = {
  _id: '1',
  ingredients: ['ingredient-1'],
  status: 'done',
  name: 'Тестовый заказ',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  number: 1
};

const mockNewOrder = {
  _id: '1',
  ingredients: ['ingredient-1'],
  status: 'done',
  name: 'Тестовый заказ',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  number: 1,
  price: 100,
  owner: {
    name: '',
    email: 'test@test.ru',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
};

describe('order async action', () => {
  test('createOrder request', () => {
    const state = orderReducer(initialState, createOrder.pending('', []));

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('createOrder Success', () => {
    const state = orderReducer(
      initialState,
      createOrder.fulfilled(mockNewOrder, '', [])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual({
      ...mockNewOrder,
      ingredients: []
    });
  });

  test('createOrder Failed', () => {
    const state = orderReducer(
      initialState,
      createOrder.rejected(new Error('Ошибка'), '', [])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  test('fetchOrderByNumber Request', () => {
    const state = orderReducer(initialState, fetchOrderByNumber.pending('', 1));

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchOrderByNumber Success', () => {
    const state = orderReducer(
      initialState,
      fetchOrderByNumber.fulfilled(mockOrder, '', 1)
    );

    expect(state.orderRequest).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
  });

  test('fetchOrderByNumber Failed', () => {
    const state = orderReducer(
      initialState,
      fetchOrderByNumber.rejected(new Error('Ошибка'), '', 1)
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
