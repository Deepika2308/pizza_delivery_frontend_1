import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    cartPizzas:[],
    cartSize:0
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart :(state,action) => {
            let len = state.cartPizzas.length;
            state.cartPizzas[len] = action.payload;
            state.cartPizzas[len].id = len;
            state.cartSize = len+1;
        },
        removeFromCart : (state,action) => {
            const id = action.payload;

            let remainingPizzas = state.cartPizzas.filter((pizza) => pizza.id !== id)
            state.cartPizzas = remainingPizzas;
            state.cartSize = state.cartPizzas.length;
        },
        addCrustToItem : (state,action) => {
            let forPizza = action.payload.forPizza;
            const cartPizzas = state.cartPizzas;
            const findPizza = cartPizzas.filter((pizza) => pizza.id === forPizza);
            const crustsArray = findPizza[0].crusts;
            crustsArray.push(action.payload);
        },
        removeCrustFromItem : (state,action) => {
            //get pizzaId from action payload
            const forPizza = action.payload.forPizza;
            const crustName = action.payload.name;

            //get pizzas from cart
            let pizzas = state.cartPizzas;

            //get pizza from which crust to be removed
            let pizza = pizzas.find((obj) => obj.id === forPizza);

            let crust = pizza.crusts;
            let remainingCrusts = crust.filter((crust) => crust.name !== crustName);
            pizza.crusts = remainingCrusts;
        }
    }
})

export default cartSlice.reducer;
export const {addToCart,removeFromCart,addCrustToItem,removeCrustFromItem} = cartSlice.actions;