import { createSlice } from "@reduxjs/toolkit";

// Calculate totals helper
const calculateCartTotals = (cartArr) => {
  let discountedprice = 0;
  let totalProduct = 0;

  cartArr.forEach((item) => {
    discountedprice += item.discountedprice * item.quantity;
    totalProduct += item.quantity;
  });

  return { discountedprice, totalProduct };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartArr: [],
    totalAmount: 0,
    totalProduct: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cartArr.find((item) => item._id === product._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartArr.push({ ...product, quantity: 1 });
      }

      const { discountedprice, totalProduct } = calculateCartTotals(
        state.cartArr
      );
      state.totalAmount = discountedprice;
      state.totalProduct = totalProduct;
    },

    increaseQuantity: (state, action) => {
      const item = state.cartArr.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
      }

      const { discountedprice, totalProduct } = calculateCartTotals(
        state.cartArr
      );
      state.totalAmount = discountedprice;
      state.totalProduct = totalProduct;
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartArr.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartArr = state.cartArr.filter((i) => i._id !== action.payload);
      }

      const { discountedprice, totalProduct } = calculateCartTotals(
        state.cartArr
      );
      state.totalAmount = discountedprice;
      state.totalProduct = totalProduct;
    },

    removeItem: (state, action) => {
      const id = action.payload;
      state.cartArr = state.cartArr.filter((item) => item._id !== id);

      const { discountedprice, totalProduct } = calculateCartTotals(
        state.cartArr
      );
      state.totalAmount = discountedprice;
      state.totalProduct = totalProduct;
    },

    clearCart: (state) => {
      // ✅ Explicitly clear cart only when you dispatch this after order success
      state.cartArr = [];
      state.totalAmount = 0;
      state.totalProduct = 0;
    },

    updateCartTotalsFromBackend: (state, action) => {
      const { itemsFromBackend, totalAmount, totalProduct } = action.payload;

      // ✅ Protect against backend sending null/undefined
      if (itemsFromBackend && Array.isArray(itemsFromBackend)) {
        state.cartArr = itemsFromBackend;
        state.totalAmount = totalAmount ?? 0;
        state.totalProduct = totalProduct ?? 0;
      }
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  updateCartTotalsFromBackend,
} = cartSlice.actions;

export default cartSlice.reducer;
