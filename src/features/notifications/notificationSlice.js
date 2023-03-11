import {createSlice} from '@reduxjs/toolkit';

const initialState={
    notification:[],
    notificationCount:0,
}

const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{
        changeNotification: (state,action) =>{
            state.notification = action.payload;
            state.notificationCount = 1;
        },
        decreaseNotificationCount : (state) => {
            state.notificationCount = 0;
        }
    }
})

export default notificationSlice.reducer;
export const {changeNotification,decreaseNotificationCount} = notificationSlice.actions;