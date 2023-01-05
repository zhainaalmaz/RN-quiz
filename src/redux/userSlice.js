import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    user: {},
  },
  reducers: {
    isAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {},
});
export const {isAuth, setUser} = userSlice.actions;

export default userSlice.reducer;
