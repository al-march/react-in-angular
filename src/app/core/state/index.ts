import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from './user.state';
import {themeReducer} from './theme.state';
import {pageUserReducer} from '@/pages/page-user/store';
import {useDispatch} from 'react-redux';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    theme: themeReducer,

    userPage: pageUserReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<RootDispatch>();
