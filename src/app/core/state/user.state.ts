import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '@/shared/models';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: []
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    }
  },
  selectors: {
    selectUsers: state => state.users,
    selectUserById: (state, userId: string | number) => state.users.find(user => String(user.id) === userId)
  }
});

export const {addUsers} = userSlice.actions;
export const {selectUsers, selectUserById} = userSlice.selectors;
export const usersReducer = userSlice.reducer;
