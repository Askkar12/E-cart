import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../Redux/Productslice'
import wishListSlice from '../Redux/WhishlistSlice'
import cartSlice from '../Redux/CartSlice'


const cartstore=configureStore({
    reducer:{
        productReducer:productSlice,
        wishlistReducer:wishListSlice,
        cartReducer:cartSlice
    }
})

export default cartstore