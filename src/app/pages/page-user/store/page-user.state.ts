import {Todo, User} from '@/shared/models';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface PageUserState {
  user: User | null;
  todos: Todo[] | null;
}

const initialState: PageUserState = {
  user: null,
  todos: null
};

export const pageUserSlice = createSlice({
  name: 'userPage',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.todos = null;
    },
    addTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    }
  },
  selectors: {
    selectUser: state => state.user,
    selectTodos: (state) => state.todos
  }
});

export const {addUser, addTodos} = pageUserSlice.actions;
export const {selectUser, selectTodos} = pageUserSlice.selectors;
export const pageUserReducer = pageUserSlice.reducer;
