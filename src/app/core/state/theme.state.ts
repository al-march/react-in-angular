import {create} from 'zustand/index';

export type ThemeMode = 'dark' | 'light';

interface State {
  mode: ThemeMode;
}

interface Actions {
  toggle: () => void;
}

export const useThemeStore = create<State & Actions>((set) => ({
  mode: 'dark',

  toggle: () => set(state => ({
    mode: state.mode === 'dark' ? 'light' : 'dark'
  }))
}));
