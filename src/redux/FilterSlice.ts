import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Filter {
  id: string;
  value: string;
  checked: boolean
}


interface CartState {
  filter: Filter[];
}

const initialState: CartState = {
  filter: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<Filter>) => {
      state.filter.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<{id: string, value: string, checked: boolean}>) => {
      state.filter = state.filter.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addFilter, removeFilter } = filterSlice.actions;
export default filterSlice.reducer;
