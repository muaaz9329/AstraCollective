import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userProfileRefresh: false,
  communityRefresh: false,
};

export const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    setUserProfileRefresh: (state, action) => {
      state.userProfileRefresh = action.payload;
    },
    setCommunityRefresh: (state, action) => {
      state.communityRefresh = action.payload;
    },
  },
});

export const {setCommunityRefresh, setUserProfileRefresh} =
  refreshSlice.actions;

export const refreshSelector = state => state.refresh;

export default refreshSlice.reducer;
