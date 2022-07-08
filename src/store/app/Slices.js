import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  networkConnect: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNetworkConnect: (state, {payload}) => {
      state.networkConnect = payload;
    },
  },
});

export const {setNetworkConnect} = appSlice.actions;
export const {reducer} = appSlice;
