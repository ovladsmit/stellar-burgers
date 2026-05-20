import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type feedOrderState = {
  feedsOrders: TOrder[];
  feedsOrderRequest: boolean;
  total: number;
  totalToday: number;
  error: null | string;
};

const initialState: feedOrderState = {
  feedsOrders: [],
  feedsOrderRequest: false,
  total: 0,
  totalToday: 0,
  error: null
};

export const fetchFeedOrders = createAsyncThunk(
  'feedsOrders/fetchFeedOrders',
  getFeedsApi
);

const feedsOrdersSlice = createSlice({
  name: 'feedsOrders',
  initialState,
  reducers: {},
  selectors: {
    getFeedsOrders: (state) => state.feedsOrders,
    getFeedsOrdersError: (state) => state.error,
    getFeedsOrdersRequest: (state) => state.feedsOrderRequest,
    getFeedsTotal: (state) => state.total,
    getFeedsTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedOrders.pending, (state) => {
        state.feedsOrderRequest = true;
        state.error = null;
      })
      .addCase(fetchFeedOrders.fulfilled, (state, action) => {
        state.feedsOrderRequest = false;
        state.feedsOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeedOrders.rejected, (state) => {
        state.error = 'Ошибка';
        state.feedsOrderRequest = false;
      });
  }
});
export const feedsReducer = feedsOrdersSlice.reducer;
export const {
  getFeedsOrders,
  getFeedsOrdersError,
  getFeedsOrdersRequest,
  getFeedsTotal,
  getFeedsTotalToday
} = feedsOrdersSlice.selectors;
