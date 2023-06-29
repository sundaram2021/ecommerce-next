import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from 'redux';

export const STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading"
});

const CategorySlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUS.SUCCESS,
    cate: ""
  },
  reducers: {
    setCategory(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCate(state, action) {
        state.cate = action.payload;
    },
    removeCate(state, action) {
        state.cate = "";
    }
  }
});

export const { setCategory, setStatus, setCate, removeCate } = CategorySlice.actions;
export default CategorySlice.reducer;

export function fetchCategory() {
  return async function fetchProductThunk(dispatch: Dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      dispatch(setCategory(data));
      dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}
