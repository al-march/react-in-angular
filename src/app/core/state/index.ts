import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from './user.state';

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
});
