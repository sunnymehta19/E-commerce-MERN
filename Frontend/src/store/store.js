import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import AdminProductSlice from "./admin-slice/productSlice"



const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductSlice,
    },
})

export default store;





