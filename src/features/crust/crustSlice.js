
import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    handTossed:0,
    wheat:0,
    thinCrust:0,
    cheesyBurst:0
}

const crustSlice = createSlice({
    name:"crust",
    initialState,
    reducers:{
        countOfHandTossed : (state,action) =>{
            if(action.payload === "increase"){
                state.handTossed += 1;
            }
            if(action.payload === "decrease"){
                state.handTossed -= 1;
            }
        },
        countOfwheat : (state,action) =>{
            if(action.payload === "increase"){
                state.wheat += 1;
            }
            if(action.payload === "decrease"){
                state.wheat -= 1;
            }
        },
        countOfthinCrust : (state,action) =>{
            if(action.payload === "increase"){
                state.thinCrust += 1;
            }
            if(action.payload === "decrease"){
                state.thinCrust -= 1;
            }
        },
        countOfcheesyBurst : (state,action) =>{
            if(action.payload === "increase"){
                state.cheesyBurst += 1;
            }
            if(action.payload === "decrease"){
                state.cheesyBurst -= 1;
            }
        }
    }
})

export default crustSlice.reducer;
export const {countOfHandTossed,
    countOfwheat,
    countOfthinCrust,
    countOfcheesyBurst} = crustSlice.actions;