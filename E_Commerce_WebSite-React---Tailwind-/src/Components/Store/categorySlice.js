import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories : null,
   filters:{
     minPrice: 0,
    maxPrice: 100,
    categoryId: null,
}
    
}

export const getCategories = createAsyncThunk("getCategories",async ()=>{

    let res = await  axios.get("http://localhost:3001/api/category/getall");
    console.log(res);
    
    return res.data;
}) ;

export const categorySlice = createSlice({
    name: "categories",
    initialState,

    reducers:{

    },
    extraReducers(builder){
           builder.addCase(getCategories.fulfilled,(state,action)=>{
            state.categories = action.payload;
            console.log("cat",state.categories)
           })
    }

})

export default categorySlice.reducer;