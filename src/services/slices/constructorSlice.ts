import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';
type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },

    addIngredient(state, action: PayloadAction<TIngredient>) {
      state.ingredients.push(action.payload);
    },

    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    },

    moveDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      const current = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = current;
    },

    moveUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      const current = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index - 1];
      state.ingredients[index - 1] = current;
    }
  }
});

export const { setBun, addIngredient, moveDown, moveUp, removeIngredient } =
  constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
export const getConstructorItems = (state: RootState) =>
  state.burgerСonstructor;
