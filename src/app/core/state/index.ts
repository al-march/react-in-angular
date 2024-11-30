import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from './user.state';
import {themeReducer} from './theme.state';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    theme: themeReducer
  }
});
