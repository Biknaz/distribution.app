import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../interfaces/interfaces";

interface IState {
  items: IItem[];
  item: IItem | null;
  count: number;
}

const initialState: IState = {
  items: [],
  item: null,
  count: 0,
};

export const { actions: itemsAction, reducer: itemsReducer } = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (
      state,
      action: PayloadAction<{ items: IItem[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),
    setItem: (state, action: PayloadAction<{ item: IItem | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
