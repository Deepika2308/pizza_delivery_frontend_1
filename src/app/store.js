import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import branchReducer from '../features/branch/branchSlice';
import cartReducer from '../features/cart/cartSlice';
import crustReducer from '../features/crust/crustSlice';
import notificationReducer from '../features/notifications/notificationSlice';

export const store =configureStore({
    reducer:{
        user:userReducer,
        branch:branchReducer,
        cart:cartReducer,
        crust:crustReducer,
        notification:notificationReducer,
    }
})