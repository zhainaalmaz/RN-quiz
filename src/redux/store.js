import {configureStore} from '@reduxjs/toolkit';
import {userApi} from './user.api';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([userApi.middleware]),
});
