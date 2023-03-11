import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API} from "../../global.js";

const initialState ={
    loading:false,
    users:[],
    error:'',
    logged:false,
    admin:false,
    jwtToken:""
}

//fetch user details 
export const fetchUsers = createAsyncThunk('users/fetchUsers', async(values) => {

    try{
    const res = await axios.post(`${API}/login`, {
        body:values,
        headers:{"content-type":"application/json"}
    })
    return res.data;
    }
    catch(err){
         return err.response.data;
    }
    
}
)

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logged : (state,action) => {
            state.logged = action.payload;
            if(action.payload === false){
                state.admin=false;
            }
        },
        changeUser : (state,action) => {
            state.admin = action.payload;
        },
        saveJWTToken : (state,action) => {
            state.jwtToken= action.payload;
        },
        userAddress: (state,action) => {
            state.users = action.payload;
        }
    },
    extraReducers : builder => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading= true;
        })
        builder.addCase(fetchUsers.fulfilled, (state,action) => {
            state.loading= false;
            state.users = action.payload;
            state.error = '';
            if(action.payload.token){
                state.logged =true;
            }
        })
        builder.addCase(fetchUsers.rejected, (state,action) => {
            state.loading=false;
            state.users=[];
            state.error= action.error.message;
        })
    }
})

export default userSlice.reducer;
export const {logged,changeUser,saveJWTToken,userAddress} = userSlice.actions;

