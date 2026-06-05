import { expect, test, describe } from '@jest/globals';
import {
  ingredientsReducer,
  fetchIngredients,
  initialState
} from './ingredientsSlice';
const mockIngredient = [
  {
    _id: '643d69a5c3f7b9001cfa0944',
    id: 'sauce-1',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
  }
];

describe('ingredientsSlice async action', () => {
  test('Request: isIngredientsLoading становится true', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );
    expect(state.isIngredientsLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Success: ингредиенты записываются в стор, загрузка false', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredient, '', undefined)
    );
    expect(state.ingredients).toEqual(mockIngredient);
    expect(state.isIngredientsLoading).toBe(false);
  });

  test('Failed: ошибка записывается в стор, загрузка false', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(new Error('Ошибка запроса'), '', undefined)
    );

    expect(state.error).toBe('Ошибка запроса');
    expect(state.isIngredientsLoading).toBe(false);
  });
});
