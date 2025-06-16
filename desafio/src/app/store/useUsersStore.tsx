// store/userStore.ts
import { create } from 'zustand';
import { User } from '../users/types'; 

interface UserState {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  updateUser: (updatedUser: User) => void;
  removeUser: (userId: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: true,
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Erro ao carregar usuários');
      }
      const data = await response.json();
      set({ users: data });
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      set({ loading: false });
    }
  },
  updateUser: (updatedUser) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    }));
  },
  
  removeUser: (userId) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    }));
  },
}));
