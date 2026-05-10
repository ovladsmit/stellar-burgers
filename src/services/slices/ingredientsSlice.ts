import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types"


type TIngredientState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: TIngredientState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
}



export const fetchIngredients = createAsyncThunk(
  'inredients/fetchIngredients',
  async() => {
    return await getIngredientsApi();
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    builder
    .addCase()
  }
})
