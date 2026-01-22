import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    addressList: [],
}


export const addNewAddress = createAsyncThunk(
    "/address/addNewAddress",
    async (formData) => {
        const response = axios.post(
            "http://localhost:3000/api/shop/address/add",
            formData
        );
        return response?.data;
    }
);


export const fetchAllAddress = createAsyncThunk(
    "/address/fetchAllAddress",
    async (userId) => {
        const response = axios.get(
            `http://localhost:3000/api/shop/address/get/${userId}`
        );
        return response?.data;
    }
);


export const editAddress = createAsyncThunk(
    "/address/editAddress",
    async ({ userId, addressId, formData }) => {
        const response = axios.put(
            `http://localhost:3000/api/shop/address/update/${userId}/${addressId}`,
            formData
        );
        return response?.data;
    }
);


export const deleteAddress = createAsyncThunk(
    "/address/deleteAddress",
    async ({ userId, addressId }) => {
        const response = axios.delete(
            `http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`
        );
        return response?.data;
    }
);


const ShopAddressSlice = createSlice({
    name: "shopAddress",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data
            })
            .addCase(addNewAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
            .addCase(fetchAllAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data
            })
            .addCase(fetchAllAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
    }
});

export default ShopAddressSlice.reducer;