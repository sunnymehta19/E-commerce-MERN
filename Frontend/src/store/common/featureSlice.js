import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    featureImageList: [],
}


export const addFeatureImage = createAsyncThunk(
    "/order/addFeatureImage",
    async (image) => {
        const response = await axios.post(
            "http://localhost:3000/api/common/feature/add",
            { image }
        );
        return response?.data
    }
);


export const getFeatureImage = createAsyncThunk(
    "/order/getFeatureImage",
    async () => {
        const response = await axios.get(
            "http://localhost:3000/api/common/feature/get",
        );
        return response?.data
    }
);


export const deleteFeatureImage = createAsyncThunk(
    "/order/deleteFeatureImage",
    async (id) => {
        const response = await axios.delete(
            `http://localhost:3000/api/common/feature/delete/${id}`,
        );
        return response?.data
    }
);



const CommonFeatureSlice = createSlice({
    name: "commonFeature",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImage.fulfilled, (state, action) => {
                state.isLoading = true;
                state.featureImageList = action.payload.data;
            })
            .addCase(getFeatureImage.rejected, (state) => {
                state.isLoading = true;
                state.featureImageList = [];
            })
            .addCase(deleteFeatureImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = state.featureImageList.filter(
                    (item) => item._id !== action.payload.data._id
                );
            });
    }
})


export default CommonFeatureSlice.reducer;