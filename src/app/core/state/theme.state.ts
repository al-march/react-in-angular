import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ThemeMode = 'dark' | 'light';

export interface AppTheme {
  mode: ThemeMode;
}

const initialState: AppTheme = {
  mode: 'dark'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    }
  },
  selectors: {
    selectTheme: state => state.mode
  }
});

export const {setTheme, toggleTheme} = themeSlice.actions;
export const {selectTheme} = themeSlice.selectors;
export const themeReducer = themeSlice.reducer;
