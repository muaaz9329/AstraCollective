import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  connectionModelOpen: false,
};

export const GlobalModelSlice = createSlice({
  name: 'GlobalModel',
  initialState,
  reducers: {
    setConnectionModel: (state, action) => {
      state.connectionModelOpen = action.payload;
    },
  },
});

export const {setConnectionModel} = GlobalModelSlice.actions;

export const GlobalModelSelector = state => state.GlobalModel;

export default GlobalModelSlice.reducer;
