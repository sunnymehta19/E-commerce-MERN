import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: { items: [] },
  isLoading: false,
};

/* ------------------------
   FETCH CART
------------------------- */
export const fetchCartItems = createAsyncThunk(
  "shopCart/fetchCartItems",
  async (userId) => {
    const res = await axios.get(
      `http://localhost:3000/api/shop/cart/${userId}`
    );
    return res.data;
  }
);

/* ------------------------
   ADD TO CART
------------------------- */
export const addToCart = createAsyncThunk(
  "shopCart/addToCart",
  async (cartData) => {
    const res = await axios.post(
      `http://localhost:3000/api/shop/cart/add`,
      cartData
    );
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "shopCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload.data;
    });
  },
});

export default cartSlice.reducer;
