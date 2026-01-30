import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isLoading: false,
    productList: [],
    featuredProducts: [],
    productDetails: null,

    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
}

export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async ({ filterParams, sortParams, page = 1 }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
            page,
            limit: 20,
        })

        const result = await axios.get(
            `http://localhost:3000/api/shop/products/get?${query}`,
        );
        return result?.data;
    }
);


export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
        const result = await axios.get(
            `http://localhost:3000/api/shop/products/get/${id}`,
        );
        return result?.data;
    }
)


export const fetchFeaturedProducts = createAsyncThunk(
    "/products/fetchFeaturedProducts",
    async () => {
        const result = await axios.get(
            "http://localhost:3000/api/shop/products/featured"
        );
        return result?.data;
    }
);


const ShopProductSlice = createSlice({
    name: "shopProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;

                state.currentPage = action.payload.pagination.currentPage;
                state.totalPages = action.payload.pagination.totalPages;
                state.totalProducts = action.payload.pagination.totalProducts;

            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
                state.currentPage = 1;
                state.totalPages = 1;
                state.totalProducts = 0;

            })
            .addCase(fetchProductDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetails = null;
            })
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featuredProducts = action.payload.data;
            })
            .addCase(fetchFeaturedProducts.rejected, (state) => {
                state.isLoading = false;
                state.featuredProducts = [];
            })

    },
});

export default ShopProductSlice.reducer;