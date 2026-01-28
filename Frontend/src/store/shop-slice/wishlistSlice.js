import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    wishlist: [],
}

export const fetchWishlist = createAsyncThunk(
    "fetch/fetchWishlist",
    async (userId) => {
        const response = await axios.get(
            `http://localhost:3000/api/shop/wishlist/${userId}`
        );
        return response?.data;
    }
);


export const addWishlist = createAsyncThunk(
    "fetch/addWishlist",
    async (data) => {
        const response = await axios.post(
            "http://localhost:3000/api/shop/wishlist/add",
            data
        );
        return response?.data;
    }
);


export const removeWishlist = createAsyncThunk(
    "fetch/removeWishlist",
    async ({ userId, productId }) => {
        const response = await axios.post(
            "http://localhost:3000/api/shop/wishlist/remove",
            {
                userId,
                productId,
            },
        );
        return response?.data;
    }
);


const ShopWishlistSlice = createSlice({
    name: "shopWishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlist = action.payload.data?.items || [];
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlist = action.payload.data?.items || [];
            })
            .addCase(removeWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlist = action.payload.data?.items || [];
            })
            
    },
});

export default ShopWishlistSlice.reducer;
