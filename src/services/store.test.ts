import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from './slices/ingredientsSlice';
import { initialState as constructorInitialState } from './slices/constructorSlice';
import { initialState as orderInitialState } from './slices/orderSlice';
import { initialState as ordersInitialState } from './slices/ordersSlice';
import { initialState as feedsInitialState } from './slices/feedsSlice';
import { initialState as userInitialState } from './slices/userSlice';

test('Инициализация rootReducer', () => {
  const state = rootReducer(undefined, {
    type: 'UNKNOWN_ACTION'
  });

  expect(state).toEqual({
    ingredients: ingredientsInitialState,
    burgerСonstructor: constructorInitialState,
    order: orderInitialState,
    orders: ordersInitialState,
    feedsOrders: feedsInitialState,
    user: userInitialState
  });
});
