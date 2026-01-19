import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import AdminProductSlice from "./admin-slice/productSlice"
import ShopProductSlice from "./shop-slice/productSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductSlice,
        shopProducts: ShopProductSlice,
    },
})

export default store;





