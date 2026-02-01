import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    stats: null,
};

export const fetchDashboardStats = createAsyncThunk(
    "/admin/dashboard/fetchDashboardStats",
    async () => {
        const result = await axios.get(
            "http://localhost:3000/api/admin/dashboard/dashboard-stats",
            { withCredentials: true },
        );

        return result?.data;
    }
);

const AdminDashboardSlice = createSlice({
    name: "adminDashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stats = action.payload.data;
            })
            .addCase(fetchDashboardStats.rejected, (state) => {
                state.isLoading = false;
                state.stats = null;
            });
    },
});

export default AdminDashboardSlice.reducer;
