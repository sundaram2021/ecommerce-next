import { createSlice } from "@reduxjs/toolkit";
// import { init } from "next/dist/compiled/@vercel/og/satori";



const SearchSlice = createSlice({
  name: "Search",
  initialState: {
    searchState: false,
    values: [] as string[],
    filterValue: "" as string
  },
  reducers: {
    addValue: (state, action) => {
        state.values.push(action.payload);
    },
    removeValue: (state, action) => {
        state.values =  state.values.filter((value) => value !== action.payload);
    },
    searchState: (state, action) => {
        state.searchState =  action.payload;
        // return state.searchState;
    },
    filterValue: (state, action) => {
        state.filterValue =  action.payload;
        // return state.searchState;
    },
    removeFilterValue: (state, action) => {
        state.filterValue =  "";
        // return state.searchState;
    }
  }
});

export const { addValue, removeValue, searchState } = SearchSlice.actions;
export default SearchSlice.reducer;
