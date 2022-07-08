import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  userName: '',
  userNameLoading: '',
};

export const appSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserNameStart: state => {
      state.userNameLoading = true;
    },
    setUserNameSuccess: (state, {payload}) => {
      state.userName = payload;
      state.userNameLoading = false;
    },
    setUserNameError: state => {
      state.userNameLoading = false;
    },
  },
});

export const {setUserNameStart, setUserNameSuccess, setUserNameError} =
  appSlice.actions;
export const {reducer} = appSlice;
