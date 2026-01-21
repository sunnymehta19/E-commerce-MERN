import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import AdminProductSlice from "./admin-slice/productSlice"
import ShopProductSlice from "./shop-slice/productSlice"
import ShopCartSlice from "./shop-slice/cartSlice"
import reviewSlice from "./shop-slice/reviewSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductSlice,
        shopProducts: ShopProductSlice,
        shopCart: ShopCartSlice,
        shopReview: reviewSlice,

    },
})

export default store;





