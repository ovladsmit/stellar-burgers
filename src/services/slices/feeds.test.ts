import { feedsReducer, fetchFeedOrders, initialState } from './feedsSlice';
import { expect, test, describe } from '@jest/globals';
const mockFeedResponse = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: ['ingredient-1', 'ingredient-2'],
      status: 'done',
      name: 'Тестовый заказ',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 1
    }
  ],
  total: 100,
  totalToday: 10
};

describe('feeds async action', () => {
  test('Request: feedsOrderRequest становится true', () => {
    const state = feedsReducer(
      initialState,
      fetchFeedOrders.pending('', undefined)
    );

    expect(state.feedsOrderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Success: заказы записываются в стор, загрузка false', () => {
    const state = feedsReducer(
      initialState,
      fetchFeedOrders.fulfilled(mockFeedResponse, '', undefined)
    );

    expect(state.feedsOrderRequest).toBe(false);
    expect(state.feedsOrders).toEqual(mockFeedResponse.orders);
    expect(state.total).toBe(mockFeedResponse.total);
    expect(state.totalToday).toBe(mockFeedResponse.totalToday);
  });

  test('Failed: ошибка записывается в стор, загрузка false', () => {
    const state = feedsReducer(
      initialState,
      fetchFeedOrders.rejected(new Error('Ошибка'), '', undefined)
    );

    expect(state.feedsOrderRequest).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
