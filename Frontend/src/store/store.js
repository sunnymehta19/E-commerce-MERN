import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import AdminProductSlice from "./admin-slice/productSlice"
import ShopProductSlice from "./shop-slice/productSlice"
import ShopCartSlice from "./shop-slice/cartSlice"
import ShopAddressSlice from "./shop-slice/addressSlice"
import reviewSlice from "./shop-slice/reviewSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductSlice,
        shopProducts: ShopProductSlice,
        shopCart: ShopCartSlice,
        shopAddress: ShopAddressSlice,
        shopReview: reviewSlice,

    },
})

export default store;





