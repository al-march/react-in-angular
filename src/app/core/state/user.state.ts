import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '@/shared/models';
import {httpClient} from '@/core/http';

interface UsersState {
  users: User[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null,
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null
};

export const fetchUsersThunk = createAsyncThunk('get-users', async () => {
  const response = await httpClient.get<User[]>('/users');
  return response.data;
});

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
    selectStatus: state => state.status,
    selectUserById: (state, userId: string | number) => state.users.find(user => String(user.id) === userId)
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown Error';
      });
  }
});

export const {addUsers} = userSlice.actions;
export const {selectUsers, selectStatus, selectUserById} = userSlice.selectors;
export const usersReducer = userSlice.reducer;
