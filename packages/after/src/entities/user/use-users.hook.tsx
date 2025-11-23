import { createContext, useContext } from 'react';
import type { User } from './user-type.model';
import { useQuery } from '@/shared/hooks';
import { userService } from './user-service.api';

interface UsersContextValue {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const UsersContext = createContext<UsersContextValue | null>(null);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery(userService.getAll);

  const returnValue: UsersContextValue = {
    users: users ?? [],
    isLoading,
    error,
    refetch,
  };

  return (
    <UsersContext.Provider value={returnValue}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error('유저 프로바이더 내부에서 사용해야함');
  }

  const { users, isLoading, error, refetch } = context;

  return { users, isLoading, error, refetch };
};
