import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  searchTerm: [],
  noOfTerms: 0,
};

export const SearchTermsSlice = createSlice({
  name: 'searchTerms',
  initialState,
  reducers: {
    addNewTerm: (state, action) => {
      if (state.searchTerm.includes(action.payload)) return;
      if (state.searchTerm.length > 20) state.searchTerm.pop();
      state.searchTerm.unshift(action.payload);
      state.noOfTerms = state.searchTerm.length;
    },
    removeTerm: (state, action) => {
      state.searchTerm = state.searchTerm.filter(
        term => term !== action.payload,
      );
      state.noOfTerms = state.searchTerm.length;
    },
  },
});

export const {addNewTerm, removeTerm} = SearchTermsSlice.actions;

export const SearchTermsSelector = state => state.searchTerms;

export default SearchTermsSlice.reducer;
