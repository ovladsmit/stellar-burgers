import { expect, test, describe } from '@jest/globals';
import { addIngredient, constructorReducer, initialState, moveDown, moveUp, removeIngredient, setBun } from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
const mockBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
};



const mockMain2: TConstructorIngredient[] = [
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
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
  },
  {
    _id: '643d69a5c3f7b9001cfa0946',
    id: 'main-1',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    image_large:
      'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
  }
];

const mockMain1: TConstructorIngredient[] = [
  
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
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
  },
  
];

const mockMain2_1: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0946',
    id: 'main-1',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    image_large:
      'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
  },
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
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
  },
  
];

describe('тесты синхронных экшенов', () => {
  test('Добавление булки', () => {
    const initialIngredientState = {
      ...initialState,
      bun: null,
      ingredients: []
    };

    const newState = constructorReducer(initialIngredientState, setBun(mockBun))

    expect(newState).toEqual({...initialState, bun: mockBun})

  })

  test("Удаление ингредиента", () => {
    const initialIngredientState = {
      ...initialState,
      bun: null,
      ingredients: mockMain2
    };

    const newState = constructorReducer(initialIngredientState, removeIngredient(1))

    expect(newState).toEqual({...initialState, ingredients: mockMain1})
  })

  test("Добавление ингредиента", () => {
    const initialIngredientState = {
      ...initialState,
      bun: null,
      ingredients: mockMain1
    };

    const newState = constructorReducer(initialIngredientState, addIngredient(mockMain2[1]))

    expect(newState.ingredients).toHaveLength(2)// проверяем сам факт добавления тк как id разные
  })

  test("Перемещение вниз", () => {
    const initialIngredientState = {
      ...initialState,
      bun:null,
      ingredients: mockMain2_1
    };

    const newState = constructorReducer(initialIngredientState, moveDown(0))

    expect(newState).toEqual({...initialState, ingredients: mockMain2})
  })

  test("Перемещение вверх", () => {
    const initialIngredientState = {
      ...initialState,
      bun:null,
      ingredients: mockMain2
    };

    const newState = constructorReducer(initialIngredientState, moveUp(1))

    expect(newState).toEqual({...initialState, ingredients: mockMain2_1})
  })
})
