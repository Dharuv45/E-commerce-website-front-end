import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  offset: 0,
  limit: 12,
  products: [],
  isLoading: false,
  filters: {
    minPrice: 0,
    maxPrice: 1000,
    categoryId: null,
    title:null,
  }
};

export const getProducts = createAsyncThunk("getProducts", async ({ offset, limit, filters }) => {
  const { minPrice, maxPrice, categoryId ,title} = filters;
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/fetch`, {
    params: {
      minPrice: minPrice,
      maxPrice: maxPrice,
      categoryId: categoryId,
      offset: offset,
      limit: limit,
      title:title
    }
  });
  console.log(response);
  
  return response.data;
});

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setOffset(state, action) {
      state.offset = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setTitle(state,action){
      state.filters.title = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { setOffset, setFilters ,setTitle} = paginationSlice.actions;
export default paginationSlice.reducer;
