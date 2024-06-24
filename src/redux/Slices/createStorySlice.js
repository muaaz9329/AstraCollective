import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userPrompt: '',
  character: '',
  interests: '',
  genres: '',
};

export const createStory = createSlice({
  name: 'createStory',
  initialState,
  reducers: {
    setUserPrompt: (state, action) => {
      state.userPrompt = action.payload;
    },
    setCharacter: (state, action) => {
      state.character = action.payload;
    },
    setInterests: (state, action) => {
      state.interests = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const {setCharacter, setGenres, setInterests, setUserPrompt} =
  createStory.actions;

export default createStory.reducer;
