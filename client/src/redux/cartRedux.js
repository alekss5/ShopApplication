// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     quantity: 0,
//     total: 0,
//   },
//   reducers: {
//     addProduct: (state, action) => {
//       state.quantity += 1;
//       state.products.push(action.payload);
//       state.total += action.payload.price * action.payload.quantity;
//     },
//   },
// });

// export const { addProduct } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((product) => product.id !== productId);
      // Recalculate total if necessary
    },
    updatePrice: (state, action) => {
      const { productId, newPrice } = action.payload;
      const productToUpdate = state.products.find((product) => product.id === productId);
      if (productToUpdate) {
        state.total -= productToUpdate.price * productToUpdate.quantity;
        productToUpdate.price = newPrice;
        state.total += productToUpdate.price * productToUpdate.quantity;
      }
    },
    updateTotalPrice: (state) => {
      state.total = state.products.reduce(
        (total, product) => total + product.price * product.quantity,0);
    },
  },
});

export const { addProduct, removeProduct,updatePrice,updateTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;
