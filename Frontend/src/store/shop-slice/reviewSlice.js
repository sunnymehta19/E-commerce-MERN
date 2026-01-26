import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  reviews: [],
}


export const addReviews = createAsyncThunk(
  "/order/addReviews",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/shop/review/add",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/review/${id}`
    );
    return response.data;
  }
)


const ShopReviewSlice = createSlice({
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
      })
  }
})


export default ShopReviewSlice.reducer;