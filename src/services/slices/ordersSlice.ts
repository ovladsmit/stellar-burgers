import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orders: TOrder[];
  ordersRequest: boolean;
  error: string | null;
};
export const initialState: TOrdersState = {
  orders: [],
  ordersRequest: false,
  error: null
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => await getOrdersApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getOrdersRequest: (state) => state.ordersRequest,
    getOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.ordersRequest = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersRequest = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.error = 'Ошибка';
        state.ordersRequest = false;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;

export const { getOrders, getOrdersRequest, getOrdersError } =
  ordersSlice.selectors;
