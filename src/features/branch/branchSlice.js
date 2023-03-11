import { createSlice } from '@reduxjs/toolkit';

const initialState={
    branchName:""
}

const branchSlice = createSlice({
    name:"branch",
    initialState,
    reducers:{
        saveBranch : (state,action) => {
            state.branchName = action.payload;
        }
    }
})

export default branchSlice.reducer;
export const{ saveBranch } = branchSlice.actions;