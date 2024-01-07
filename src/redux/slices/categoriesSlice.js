/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// const fetchCategories = createAsyncThunk(

// );

const initialState = {
  loading: true,
  categoriesArr: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   // builder.addCase(fetchCategories.fulfilled, (state, action) => {
  //   //   // state.categoriesArr.push(action);
  //   //   console.log(state);
  //   //   console.log(action);
  //   // });
  // },
});

export default categoriesSlice.reducer;
