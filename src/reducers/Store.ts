import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from "./SearchSlice";
import CategoryReducer from "./CategorySlice";

const Store = configureStore({
  reducer: {
    search: SearchReducer,
    category: CategoryReducer
  }
});

export default Store;
