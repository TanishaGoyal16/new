import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchBox:""
  },
  reducers: {
    search: (state, { payload }) => {
        console.log(payload);
        state.searchBox=payload;
    }

  
    
  },
});

export const {
  search
} = searchSlice.actions;

export default searchSlice.reducer;