import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] // array of plant objects with quantity
  },
  reducers: {
    //  Add item to cart
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1; // increment if it already exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // add with quantity=1
      }
    },

    //  Remove item from cart
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    //  Update quantity of item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // destructure
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    }
  }
});

//  Export actions for use in ProductList.jsx and CartItem.jsx
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

//  Export reducer for use in store.js
export default cartSlice.reducer;
