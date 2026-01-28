import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import AdminProductSlice from "./admin-slice/productSlice"
import AdminOrderSlice from "./admin-slice/orderSlice"
import ShopProductSlice from "./shop-slice/productSlice"
import ShopCartSlice from "./shop-slice/cartSlice"
import ShopAddressSlice from "./shop-slice/addressSlice"
import ShopOrderSlice from "./shop-slice/orderSlice";
import ShopSearchSlice from "./shop-slice/searchSlice";
import ShopReviewSlice from "./shop-slice/reviewSlice";
import ShopWishlistSlice from "./shop-slice/wishlistSlice";
import CommonFeatureSlice from "./common/featureSlice";


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
        shopReview: ShopReviewSlice,
        shopWishlist: ShopWishlistSlice,
        commonFeature: CommonFeatureSlice,
        
    },
})

export default store;





