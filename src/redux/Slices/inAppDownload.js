import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  stories: [],
};

export const inAppDownload = createSlice({
  name: 'inAppDownload',
  initialState,
  reducers: {
    addStoryToDownload: (state, action) => {
      if (state?.stories?.length < 10) {
        state.stories.push(action.payload);
      } else {
        state.stories.shift();
        state.stories.push(action.payload);
      }
    },
    deleteStoryFromStorage: (state, action) => {
      state.stories = state.stories.filter(item => item._id !== action.payload);
    },
  },
});

export const {addStoryToDownload, deleteStoryFromStorage} =
  inAppDownload.actions;

export const inAppDownloadSelector = state => state.inAppDownload;

export default inAppDownload.reducer;
