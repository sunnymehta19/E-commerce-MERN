import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: [],
  isLoading: false,
};

/* ------------------------
   GET REVIEWS
------------------------- */
export const getReviews = createAsyncThunk(
  "shopReview/getReviews",
  async (productId) => {
    const res = await axios.get(
      `http://localhost:3000/api/shop/reviews/${productId}`
    );
    return res.data;
  }
);

/* ------------------------
   ADD REVIEW
------------------------- */
export const addReview = createAsyncThunk(
  "shopReview/addReview",
  async (reviewData) => {
    const res = await axios.post(
      `http://localhost:3000/api/shop/reviews/add`,
      reviewData
    );
    return res.data;
  }
);

const reviewSlice = createSlice({
  name: "shopReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
