import { createSlice } from "@reduxjs/toolkit";
// # ------------ [ CREATE SLICE FOR THE REDUX STORE ] ----------------
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // item object: [{id, price, quantity, totalPrice, name/title}]
    totalQuantity: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      // Returns the item object if it exists in the cart already
      console.log(state.items);
      let existingItem;
      if (state.items === undefined) existingItem = [];
      else existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      // state.changed=true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
