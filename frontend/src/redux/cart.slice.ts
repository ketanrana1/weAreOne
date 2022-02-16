import {createSlice} from '@reduxjs/toolkit';


// const currency = sessionStorage.getItem("Currency")
// const currencySymbol = sessionStorage.getItem("currencySymbol");
// const convertedPrice = +sessionStorage.getItem("convertedPrice");

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const { quantity, id, productVariant, productType } = action.payload;
            const itemExists = state.find((item) => item.id === id);
            if (itemExists && productType === "artPrint") {
                const variantExists = state.find((item) => item.productVariant == productVariant);
                if(variantExists) {
                    variantExists.quantity += quantity;                    
                } else if ( !variantExists ) {
                    state.push({ ...action.payload, quantity: quantity });
                }
            } else if (itemExists && productType === "book") {
                itemExists.quantity += quantity;

            } else {
                state.push({ ...action.payload, quantity: quantity });
            }
        },
        incrementQuantity: (state, action) => {
            const { quantity, id, productVariant, productType } = action.payload;
            const itemExists = state.find((item) => item.id === id);
            const item = state.find((item) => item.produtVariant === productVariant);
            if (productType === "artPrint") {
                const variantExists = state.find((item) => item.productVariant == productVariant);
                variantExists.quantity++
            } else if (productType === "book") {
                itemExists.quantity++;
            }
        },
        // incrementQuantity: (state, action) => {
        //     const item = state.find((item) => item.id === action.payload);
        //     item.quantity++;
        // },
        setUpdateQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload.id);
            item.quantity = action.payload.quantity;
        },
        decrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
                const index = state.findIndex((item) => item.id === action.payload);
                state.splice(index, 1);
            } else {
                item.quantity--;
            } 
        },
        removeFromCart: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1);
        },
        resetCart: (state) => {
            state.splice(0, state.length);
        },
        // updatePrice: (state, action) => {
        //     // state = action.payload
        //     // // console.log("PAYLOAD", state)
        //     // console.log("STATE", state)


        //     // state.push(action.payload);

        //     // // return {...action.payload}
      
        // },
    },
});

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    incrementQuantity,
    setUpdateQuantity,
    decrementQuantity,
    removeFromCart,
    resetCart,
} = cartSlice.actions;
