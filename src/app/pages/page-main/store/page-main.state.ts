import {User} from '@/shared/models';
import {FetchStatus} from '@/shared/tools';
import {create} from 'zustand/index';
import {httpClient} from '@/core/http';

interface State {
  users: User[];
  status: FetchStatus;
}

interface Actions {
  fetchUsers: () => Promise<void>;
  reset: () => void;
}

export const usePageMainStore = create<State & Actions>((set) => ({
  users: [],
  status: 'idle',

  fetchUsers: async () => {
    set(() => ({users: [], status: 'pending'}));
    const users = (await httpClient.get<User[]>(`/users`)).data;
    set(() => ({users, status: 'succeeded'}));
  },
  reset: () => set(() => ({users: []}))
}));
