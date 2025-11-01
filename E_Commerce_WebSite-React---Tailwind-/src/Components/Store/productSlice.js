import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allProducts: null,
    isLoading : false,
  
}

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/fetch`)
    console.log("our products ", res)
    return res?.data;
})

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
       
    },
    extraReducers(builder) {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allProducts = action.payload.data;
               
                console.log("data", action.payload.data)
            })
            .addCase(getAllProducts.pending, (state, action) => {
                state.isLoading = true;
               
            })
    }
})

export default productSlice.reducer;