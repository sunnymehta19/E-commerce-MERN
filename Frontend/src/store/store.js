import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import AdminProductSlice from "./admin-slice/productSlice"
import ShopProductSlice from "./shop-slice/productSlice"
import reviewSlice from "./shop-slice/reviewSlice"
import cartSlice from "./shop-slice/cartSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductSlice,
        shopProducts: ShopProductSlice,
        shopReview: reviewSlice,
        shopCart: cartSlice,

    },
})

export default store;





