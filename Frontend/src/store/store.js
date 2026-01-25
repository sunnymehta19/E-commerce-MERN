import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import AdminProductSlice from "./admin-slice/productSlice"
import AdminOrderSlice from "./admin-slice/orderSlice"
import ShopProductSlice from "./shop-slice/productSlice"
import ShopCartSlice from "./shop-slice/cartSlice"
import ShopAddressSlice from "./shop-slice/addressSlice"
import ShopOrderSlice from "./shop-slice/orderSlice";
import ShopSearchSlice from "./shop-slice/searchSlice";
import reviewSlice from "./shop-slice/reviewSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductSlice,
        adminOrder: AdminOrderSlice,
        shopProducts: ShopProductSlice,
        shopCart: ShopCartSlice,
        shopAddress: ShopAddressSlice,
        shopOrder: ShopOrderSlice,
        shopSearch: ShopSearchSlice,
        shopReview: reviewSlice,

    },
})

export default store;





