import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types"
import { RootState } from '../store';
type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[]
}

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers:{
    setBun(state, action: PayloadAction<TIngredient>){
      state.bun = action.payload;
    },

    addIngredient(state, action: PayloadAction<TIngredient>){
      state.ingredients.push(action.payload)
    }
  },
  
})

export const {setBun, addIngredient} = constructorSlice.actions

export const constructorReducer = constructorSlice.reducer
export const getConstructorItems = (state: RootState) =>
  state.burgerСonstructor;
