import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  comments: [
    {
      comment: {},
      replies: [],
    },
  ],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action) => {
      //   console.log('I ran');
      state.comments = action.payload;
    },
  },
});

export const {setComments} = commentSlice.actions;

export const commentSelector = state => state.comment;

export default commentSlice.reducer;
