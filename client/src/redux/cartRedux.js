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
      const newProduct = action.payload;
    
      const existingProduct = state.products.find(
        (product) =>
          product.id === newProduct.id &&
          product.size === newProduct.size &&
          product.color === newProduct.color
      );

      if (!existingProduct) {
        state.products.push(newProduct);
        state.quantity += newProduct.quantity;
        state.total += newProduct.price * newProduct.quantity;
      }
    },
    removeProduct: (state, action) => {
      const productInfo = action.payload;
      console.log(productInfo);
      const [id,color] = productInfo.split(',');
      const productToRemoveIndex = state.products.findIndex(
        (product) => product.id === id && product.color === color
      );
    
      if (productToRemoveIndex !== -1) {
        const productToRemove = state.products[productToRemoveIndex];
        state.quantity -= productToRemove.quantity;
        state.total -= productToRemove.price * productToRemove.quantity;
        state.products.splice(productToRemoveIndex, 1);
      }
    },
    removeAllProducts: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    updateProductQuantity: (state, action) => {
      const productInfo = action.payload;
      const [id, color, operation] = productInfo.split(',');
      const productIndex = state.products.findIndex(
        (product) => product.id === id && product.color === color
      );
      console.log(operation)
    
      if (productIndex !== -1) {
        const product = state.products[productIndex];
        if (operation === 'inc') {
          product.quantity += 1;
          state.total += product.price;
          state.quantity +=1
        } else if (operation === 'dec') {
          if (product.quantity > 1) {
            product.quantity -= 1;
            state.total -= product.price;
            state.quantity -=1
          }
        }
      }
    }
  },
});

export const { addProduct, removeProduct,removeAllProducts,updateProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;
