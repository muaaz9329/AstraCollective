import {createSlice} from '@reduxjs/toolkit';

export const InitialSignUpStep = {
  startUp: 'startUp',
  SignUp: 'SignUp',
  VerifyEmail: 'VerifyEmail',
  ProfileCreation: 'ProfileCreation',
  AddInterest: 'AddInterest',
  AddGenre: 'AddGenre',
  AddCharacters: 'AddCharacters',
};

const initialState = {
  stepNo: InitialSignUpStep.startUp,
};

export const signupStep = createSlice({
  name: 'signupStep',
  initialState,
  reducers: {
    setInitialSignupStep: (state, action) => {
      state.stepNo = action.payload;
    },
  },
});

export const {setInitialSignupStep} = signupStep.actions;

export default signupStep.reducer;
