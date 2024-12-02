import {Todo, User} from '@/shared/models';
import {FetchStatus} from '@/shared/tools';
import {create} from 'zustand';
import {httpClient} from '@/core/http';

interface State {
  user: User | null;
  todos: Todo[] | null;
  status: FetchStatus;
}

interface Actions {
  fetchUser: (userId: number) => Promise<void>;
  fetchTodos: (userId: number) => Promise<void>;
  reset: () => void;
}

export const usePageUserStore = create<State & Actions>((set) => ({
  user: null,
  todos: null,
  status: 'idle',

  fetchUser: async (userId: number) => {
    set(() => ({user: null, status: 'pending'}));
    const user = (await httpClient.get<User>(`/users/${userId}`)).data;
    set(() => ({user, todos: null, status: 'succeeded'}));
  },
  fetchTodos: async (userId: number) => {
    set(() => ({status: 'pending'}));
    const todos = (await httpClient.get<Todo[]>(`/todos/?userId=${userId}`)).data;
    set(() => ({todos, status: 'succeeded'}));
  },
  reset: () => set(() => ({user: null, todos: null}))
}));
