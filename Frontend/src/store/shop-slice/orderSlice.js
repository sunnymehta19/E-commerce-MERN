import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    orderId: null,
    razorpayOrder: null,
    confirmedOrder: null,
    error: null,
    orderList: [],
    orderDetails: null,

}

export const createNewOrder = createAsyncThunk(
    "/order/createNewOrder",
    async (orderData) => {
        const response = await axios.post(
            "http://localhost:3000/api/shop/order/create",
            orderData
        );
        return response?.data;
    }
);


export const capturePayment = createAsyncThunk(
    "/order/capturePayment",
    async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId }) => {
        const response = await axios.post(
            "http://localhost:3000/api/shop/order/capture-payment",
            {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                orderId,
            }
        );
        return response?.data;
    }
);


export const getAllOrdersByUser = createAsyncThunk(
    "/order/getAllOrdersByUser",
    async (userId) => {
        const response = await axios.get(
            `http://localhost:3000/api/shop/order/list/${userId}`
        );
        return response?.data;
    }
);


export const getOrderDetails = createAsyncThunk(
    "/order/getOrderDetails",
    async (id) => {
        const response = await axios.get(
            `http://localhost:3000/api/shop/order/details/${id}`
        );
        return response?.data;
    }
);


export const cancelOrder = createAsyncThunk(
    "/order/cancelOrder",
    async (orderId) => {
        const response = await axios.put(
            `http://localhost:3000/api/shop/order/cancel/${orderId}`
        );
        return response?.data;
    }
);




const ShopOrderSlice = createSlice({
    name: "shopOrder",
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.isLoading = false;
            state.orderId = null;
            state.razorpayOrder = null;
            state.confirmedOrder = null;
            state.error = null;
            state.orderDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderId = action.payload.orderId;
                state.razorpayOrder = action.payload.razorpayOrder;
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })
            .addCase(capturePayment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(capturePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderId = action.payload.data;
            })
            .addCase(capturePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })
            .addCase(getAllOrdersByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(getAllOrdersByUser.rejected, (state) => {
                state.isLoading = false;
                state.orderList = [];
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelOrder.fulfilled, (state) => {
                state.isLoading = false;
                if (state.orderDetails) {
                    state.orderDetails.orderStatus = "cancelled";
                }

                state.orderList = state.orderList.map(order =>
                    order._id === state.orderDetails?._id
                        ? { ...order, orderStatus: "cancelled" }
                        : order
                );
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to cancel order";
            })

    },
});

export const { resetOrderDetails } = ShopOrderSlice.actions;
export default ShopOrderSlice.reducer;