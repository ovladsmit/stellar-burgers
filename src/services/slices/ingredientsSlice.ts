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
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.isIngredientsLoading,
    getIngredientsError: (state) => state.error
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchIngredients.pending, (state) => {
      state.isIngredientsLoading = true;
      state.error = null;
    })
    .addCase(fetchIngredients.fulfilled, (state, action) =>{
      state.isIngredientsLoading = false;
      state.ingredients = action.payload;
    })
    .addCase(fetchIngredients.rejected, (state, action) => {
      state.isIngredientsLoading = false;
      state.error = action.error.message || 'Error'
    })
  }
})

export const{getIngredients, getIngredientsLoading, getIngredientsError} = ingredientsSlice.selectors
export const ingredientsReducer = ingredientsSlice.reducer;
