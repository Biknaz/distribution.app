import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../interfaces/interfaces";

interface IState {
  orders: IOrder[];
  order: IOrder | null;
  count: number;
}

const initialState: IState = {
  orders: [],
  order: null,
  count: 0,
};

export const { actions: ordersAction, reducer: ordersReducer } = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (
      state,
      action: PayloadAction<{ orders: IOrder[]; count: number }>
    ) => ({
      ...state,
      orders: [...state.orders, ...action.payload.orders],
      count: action.payload.count,
    }),
    setOrder: (state, action: PayloadAction<{ order: IOrder | null }>) => ({
      ...state,
      ...action.payload,
    }),
    setEmptyOrders: (state) => ({
      ...state,
      orders: [],
      count: 0,
    }),
  },
});
