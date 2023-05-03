import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderId:1,
    orderItems: [],
  },
  reducers: {
    showList: (state, { payload }) => {
      state.orderItems = [...state.orderItems,{ ...payload,orderId:state.orderId }];
      state.orderId=state.orderId+1;
    },
  },
});

export const {
  showList
} = orderSlice.actions;

export default orderSlice.reducer;