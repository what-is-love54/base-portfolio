import {createSlice} from '@reduxjs/toolkit';
import deviceStorage from 'services/deviceStorage';

export const initialState = {
  loginLoading: false,
  signUpLoading: false,
  recoveryPasswordLoading: false,
  errorLogin: false,
  isSignedIn: false,
  firstInApp: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login
    loginStart: state => {
      state.loginLoading = true;
      state.isSignedIn = false;
      state.errorLogin = false;
    },
    loginSuccess: (state, {payload}) => {
      state.isSignedIn = payload;
      state.errorLogin = false;
      state.loginLoading = false;
    },
    loginError: state => {
      state.isSignedIn = false;
      state.errorLogin = true;
      state.loginLoading = false;
    },
    setSingOut: state => {
      state.isSignedIn = false;
      deviceStorage.removeItem('token');
    },
    // setIsSignedIn
    setIsSignedIn: (state, {payload}) => {
      state.isSignedIn = payload;
    },
  },
});

export const {
  createProfileStart,
  createProfileSuccess,
  createProfileError,
  loginStart,
  loginSuccess,
  loginError,
  setInvite,
  setNumber,
  setSingOut,
  setIsSignedIn,
  setFirstInApp,
} = authSlice.actions;

export const {reducer} = authSlice;
