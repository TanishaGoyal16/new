import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  quantity: 0,
  cartItems: [],
  totalAmount: 0,
}
const cartSlice = createSlice({
  name: "cart",
 initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const isItemExist = state.cartItems.find(
        (item) => item.id === payload.id
      );
      if (!isItemExist) {
        state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
      } else {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
      
      state.quantity++;
      state.totalAmount += payload.price;
     let datas={
        cartItems:state.cartItems,
        quantity:state.quantity,
        price:state.totalAmount,
        personId:1
      }
      console.log(datas)

      const data= fetch("http://localhost:8082/backend/cart",{
        method:'POST',headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
            // "Authorization" 
        },body:JSON.stringify(datas)})
    },

    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
      state.quantity -= payload.quantity;
      state.totalAmount -= payload.price * payload.quantity;
      
      let datas={
        cartItems:state.cartItems,
        quantity:state.quantity,
        price:state.totalAmount,
        personId:1
      }
      const data= fetch("http://localhost:8082/backend/cart",{
        method:'POST',headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
            // "Authorization" 
        },body:JSON.stringify(datas)})
    },

    addItemQuantity: (state, { payload }) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      state.quantity++;
      state.totalAmount += payload.price;
      let datas={
        cartItems:state.cartItems,
        quantity:state.quantity,
        price:state.totalAmount,
        personId:1
      }
      console.log(datas)
      const data= fetch("http://localhost:8082/backend/cart",{
        method:'POST',headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
            // "Authorization" 
        },body:JSON.stringify(datas)})
    },

    subtractItemQuantity: (state, { payload }) => {
      const subItem = state.cartItems.find((item) => item.id === payload.id);
      if (subItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== subItem.id
        );
      } else {
        subItem.quantity -= 1;
      }
      state.quantity--;
      state.totalAmount -= subItem.price;
      let datas={
        cartItems:state.cartItems,
        quantity:state.quantity,
        totalAmount:state.totalAmount,
        personId:1
      }
      console.log(datas)
      const data= fetch("http://localhost:8082/backend/cart",{
        method:'POST',headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
            // "Authorization" 
        },body:JSON.stringify(datas)})
    },

    clearItems:(state)=>{
      fetch("http://localhost:8082/backend/cart/clear",{
        method:'POST',headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
            // "Authorization" 
        }})

      return initialState;
    }
  },
});

export const {
  addToCart,
  clearItems,
  removeFromCart,
  addItemQuantity,
  subtractItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;