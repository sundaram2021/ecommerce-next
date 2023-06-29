import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./CategorySlice";

const Store = configureStore({
  reducer: {
    category: CategoryReducer
  }
});

export default Store;
