import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { useSelector } from 'react-redux'

export const STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading"
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUS.SUCCESS
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    }
  }
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

interface CateInterface {
    category: {
        cate: string
    }
}

export function useFetchProduct() {
    const category = useSelector((state: CateInterface) => state.category.cate);
  return async function fetchProductThunk(dispatch: Dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await res.json();
      dispatch(setProducts(data));
      dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}
