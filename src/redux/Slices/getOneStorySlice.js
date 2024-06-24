import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  coverImage: '',
  title: '',
  interests: [],
  genres: [],
  estimatedTime: '',
};

export const getOneStory = createSlice({
  name: 'getOneStory',
  initialState,
  reducers: {
    setBook: (state, action) => {
      state._id = action.payload._id;
      state.coverImage = action.payload.coverImage;
      state.title = action.payload.title;
      state.interests = action.payload.interests;
      state.genres = action.payload.genres;
      state.estimatedTime = action.payload.estimatedTime;
    },
  },
});

export const {setBook} = getOneStory.actions;

export default getOneStory.reducer;

export const getOneStorySelector = (
  state = {
    getOneStory: {
      _id: '',
      coverImage: '',
      title: '',
      interests: [],
      genres: [],
      estimatedTime: '',
    },
  },
) => state.getOneStory;
