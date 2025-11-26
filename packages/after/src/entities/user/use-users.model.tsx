import { useSyncExternalStore } from 'react';
import type { User } from './user-type.model';
import { userStore } from './user-store.model';

interface UsersContextValue {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useUsers = (): UsersContextValue => {
  const state = useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
    userStore.getServerSnapshot
  );

  return {
    users: state.users,
    isLoading: state.isLoading,
    error: state.error,
    refetch: userStore.refetch,
  };
};
